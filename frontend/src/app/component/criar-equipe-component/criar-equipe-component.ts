import { ChangeDetectorRef, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
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
import { FormsModule, NgForm } from '@angular/forms';
import { EquipesService } from '../../services/equipes-service/equipes-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-criar-equipe-component',
  imports: [NgClass, Select, Button, FormsModule, Toast],
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

  @ViewChild('cadastroForm') cadastroForm!: NgForm;

  tipoLabel = TipoAmbulanciaLabel;

  carregandoCadastro = false;
  @Input() equipe: EquipeCadastroModel = {
    ambulanciaId: null,
    ativo: true,
    profissionalIds: [],
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
        profissionalIds: [...this.equipe!.profissionalIds],
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
          this.erroBackend = 'Não foi possível carregar as opções disponíveis.';
        },
      });
  }

  protected salvarEquipe() {
    if (this.cadastroForm?.invalid) return;

    this.carregandoCadastro = true;
    this.erroBackend = null;

    const profissionaisSelecionados = [
      this.medicoSelecionadoId,
      this.enfermeiroSelecionadoId,
      this.condutorSelecionadoId,
    ].filter((id) => id != null) as number[];

    const equipeCriada: EquipeCadastroModel = {
      ambulanciaId: this.ambulanciaSelecionada?.id,
      ativo: this.equipe?.ativo ?? true,
      profissionalIds: profissionaisSelecionados,
    };

    const request = this.idEditando
      ? this.equipesService.atualizarEquipe(this.idEditando, equipeCriada)
      : this.equipesService.salvarEquipe(equipeCriada);

    request.subscribe({
      next: (equipeSalva) => {
        this.carregandoCadastro = false;
        this.ref.close(equipeSalva);
      },
      error: (err: HttpErrorResponse) => {
        this.carregandoCadastro = false;
        console.error('Erro ao salvar a equipe', err);

        if (err.status === 400) {
          const erro = err.error?.message;

          switch (erro) {
            case 'Esta ambulância já possui equipe ativa ou está em atendimento':
            case 'A ambulância já está em uso por outra equipe ativa':
              this.cadastroForm.controls['ambulanciaId'].setErrors({ ativa: true });
              break;
            default:
              this.erroBackend = erro;
              break;
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro ao salvar a equipe.',
          });
        }
      },
    });
  }

  protected fecharCadastro() {
    this.ref.close();
  }

  get semAlteracoes(): boolean {
    if (!this.idEditando || !this.equipeOriginal) return false;

    const profissionaisAtuaisIds = [
      this.medicoSelecionadoId,
      this.enfermeiroSelecionadoId,
      this.condutorSelecionadoId,
    ]
      .filter((id) => id != null)
      .sort()
      .join(',');

    const idsOriginais = [...this.equipeOriginal.profissionalIds].sort().join(',');

    const ambulanciaAtualId = this.ambulanciaSelecionada?.id || null;

    return (
      ambulanciaAtualId === this.equipeOriginal.ambulanciaId &&
      this.equipe.ativo === this.equipeOriginal.ativo &&
      profissionaisAtuaisIds === idsOriginais
    );
  }

  getTipoLabel(tipo: any): string {
    return this.tipoLabel[tipo as TipoAmbulancia] || tipo;
  }
}
