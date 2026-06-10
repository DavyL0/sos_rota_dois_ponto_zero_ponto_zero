import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { EquipeCadastroModel } from '../../model/equipes.model';
import { finalize, forkJoin } from 'rxjs';
import { FuncaoProfissional } from '../../model/profissional.model';
import { AmbulanciasService } from '../../services/ambulancias-service/ambulancias-service';
import { ProfissionaisService } from '../../services/profissionais-service/profissionais-service';
import { MessageService } from 'primeng/api';
import { TipoAmbulancia, TipoAmbulanciaLabel } from '../../model/ambulancia.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgClass } from '@angular/common';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { EquipesService } from '../../services/equipes-service/equipes-service';

@Component({
  selector: 'app-criar-equipe-component',
  imports: [NgClass, Select, Button, FormsModule],
  providers: [MessageService],
  templateUrl: './criar-equipe-component.html',
  styleUrl: './criar-equipe-component.css',
})
export class CriarEquipeComponent implements OnInit {
  private equipesService = inject(EquipesService);
  private ambulanciasService = inject(AmbulanciasService);
  private profissionaisService = inject(ProfissionaisService);
  private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  private ref = inject(DynamicDialogRef);

  tipoLabel = TipoAmbulanciaLabel;

  carregandoCadastro = false;
  @Input() equipe: EquipeCadastroModel = {
    ambulanciaId: null,
    ativo: true,
    profissionaisIds: [],
  };
  @Input() idEditando: number | null = null;
  @Input() ambulanciaSelecionada?: any = null;
  @Input() condutorSelecionadoId?: number | null = null;
  @Input() enfermeiroSelecionadoId?: number | null = null;
  @Input() medicoSelecionadoId?: number | null = null;

  ambulanciasDisponiveis: any[] = [];
  condutoresDisponiveis: any[] = [];
  enfermeirosDisponiveis: any[] = [];
  medicosDisponiveis: any[] = [];

  equipeOriginal: EquipeCadastroModel | null = null;
  erroBackend: string | null = null;

  protected readonly TipoAmbulancia = TipoAmbulancia;

  ngOnInit() {
    if (this.idEditando) {
      this.carregarDadosFormulario(this.idEditando);
      this.equipeOriginal = {
        ...(this.equipe as EquipeCadastroModel),
        profissionaisIds: [...this.equipe!.profissionaisIds],
      };
    } else {
      this.carregarDadosFormulario();
    }
  }

  protected carregarDadosFormulario(equipeId?: number) {
    this.carregandoCadastro = true;
    forkJoin({
      ambulancias: this.ambulanciasService.obterAmbulanciasDisponiveis(equipeId),
      profissionais: this.profissionaisService.obterProfissionaisDisponiveis(equipeId),
    })
      .pipe(
        finalize(() => {
          this.carregandoCadastro = false;
          this.cd.markForCheck();
        }),
      )
      .subscribe({
        next: ({ ambulancias, profissionais }) => {
          this.ambulanciasDisponiveis = ambulancias;

          this.medicosDisponiveis = profissionais.filter(
            (p) => p.funcao === FuncaoProfissional.MEDICO,
          );
          this.enfermeirosDisponiveis = profissionais.filter(
            (p) => p.funcao === FuncaoProfissional.ENFERMEIRO,
          );
          this.condutoresDisponiveis = profissionais.filter(
            (p) => p.funcao === FuncaoProfissional.CONDUTOR,
          );
        },
        error: (err) => {
          console.error('Erro ao carregar dados do formulário de equipes:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar as opções disponíveis.',
          });
        },
      });
  }

  protected salvarEquipe() {}

  protected fecharCadastro() {
    this.ref.close();
  }

  get semAlteracoes(): boolean {
    if (!this.idEditando || !this.equipeOriginal || !this.equipe) return false;

    const idsAtuais = [...this.equipe.profissionaisIds].sort().join(',');
    const idsOriginais = [...this.equipeOriginal.profissionaisIds].sort().join(',');

    return (
      this.equipe.ambulanciaId === this.equipeOriginal.ambulanciaId &&
      this.equipe.ativo === this.equipeOriginal.ativo &&
      idsAtuais === idsOriginais
    );
  }

  getTipoLabel(tipo: any): string {
    return this.tipoLabel[tipo as TipoAmbulancia] || tipo;
  }
}
