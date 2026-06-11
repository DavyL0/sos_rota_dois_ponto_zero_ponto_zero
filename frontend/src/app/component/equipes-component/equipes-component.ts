import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { EquipesService } from '../../services/equipes-service/equipes-service';
import { EquipeExibicaoModel } from '../../model/equipes.model';
import {
  FuncaoProfissional,
  FuncaoProfissionalLabel,
  ProfissionalExibicaoModel,
} from '../../model/profissional.model';
import { TipoAmbulancia, TipoAmbulanciaLabel } from '../../model/ambulancia.model';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { Tag } from 'primeng/tag';
import { NgClass } from '@angular/common';
import { SelectButton } from 'primeng/selectbutton';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CriarEquipeComponent } from '../criar-equipe-component/criar-equipe-component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-equipes-component',
  imports: [
    ConfirmDialog,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    Toast,
    IconField,
    InputIcon,
    Button,
    InputText,
    Tooltip,
    Tag,
    NgClass,
    SelectButton,
    Paginator,
  ],
  providers: [MessageService, ConfirmationService, DialogService, DynamicDialogRef],
  templateUrl: './equipes-component.html',
  styleUrl: './equipes-component.css',
})
export class EquipesComponent implements OnInit, OnDestroy {
  private equipesService = inject(EquipesService);
  private cd = inject(ChangeDetectorRef);
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private ref: DynamicDialogRef | null = inject(DynamicDialogRef);

  equipes: EquipeExibicaoModel[] = [];

  carregando: boolean = true;
  alterandoStatusId: number | null = null;
  excluindoId: number | null = null;
  totalElementos: number = 0;
  paginaAtual: number = 0;
  tamanhoPagina: number = 10;
  termoBusca: string = '';

  protected readonly TipoAmbulancia = TipoAmbulancia;
  tipoLabel = TipoAmbulanciaLabel;
  funcaoLabel = FuncaoProfissionalLabel;
  ativasFiltro: string[] = ['Todas', 'Ativas', 'Inativas'];
  ativasSelecao: string = 'Todas';
  tipoFiltro: string[] = ['Todas', 'UTI', 'Básica'];
  tipoSelecao: string = 'Todas';

  tipoUTI = TipoAmbulancia.UTI;

  private buscaSubject = new Subject<void>();
  private buscaSubscription!: Subscription;

  ngOnInit(): void {
    this.buscaSubscription = this.buscaSubject.pipe(debounceTime(300)).subscribe(() => {
      this.paginaAtual = 0;
      this.carregarDados();
    });
    this.carregarDados();
  }

  ngOnDestroy(): void {
    this.buscaSubscription.unsubscribe();
  }

  protected carregarDados() {
    this.carregando = true;

    let ativoParam: boolean | null = null;
    if (this.ativasSelecao === 'Ativas') {
      ativoParam = true;
    }
    if (this.ativasSelecao === 'Inativas') {
      ativoParam = false;
    }

    let tipoParam: string | null = null;
    if (this.tipoSelecao === 'UTI') {
      tipoParam = TipoAmbulancia.UTI;
    }
    if (this.tipoSelecao === 'Básica') {
      tipoParam = TipoAmbulancia.BASICA;
    }

    this.equipesService
      .obterEquipes(this.paginaAtual, this.tamanhoPagina, this.termoBusca, ativoParam, tipoParam)
      .subscribe({
        next: (dados) => {
          this.equipes = dados.content;
          this.totalElementos = dados.page.totalElements;
          this.carregando = false;
          this.cd.markForCheck();
        },
        error: (err) => {
          console.error('Erro ao obter equipes:', err);
          this.carregando = false;

          this.cd.markForCheck();
        },
      });
  }

  protected alterarStatus(equipe: EquipeExibicaoModel) {
    const novoStatus = !equipe.ativo;

    this.alterandoStatusId = equipe.id;
    this.equipesService.alterarStatusEquipe(equipe.id, novoStatus).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Equipe ${novoStatus ? 'ativada' : 'inativada'} com sucesso!`,
        });
        this.alterandoStatusId = null;
        this.carregarDados();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao alterar status da equipe:', err);
        this.alterandoStatusId = null;
        if (err.status === 400) {
          const msg = err.error?.message;

          switch (msg) {
            case 'A ambulância já está em uso por outra equipe ativa':
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'A ambulância dessa equipe já está em uso por outra equipe ativa.',
              });
              break;
            case 'Não é possível desativar uma equipe em atendimento':
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Não é possível desativar uma equipe em atendimento.',
              });
              break;
            default:
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: msg,
              });
              break;
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.message,
          });
        }
      },
    });
  }

  protected confirmarExclusao(equipe: EquipeExibicaoModel) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir essa equipe?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        severity: 'danger',
      },
      accept: () => {
        this.excluirEquipe(equipe.id);
      },
    });
  }

  private excluirEquipe(id: number) {
    this.excluindoId = id;

    this.equipesService.excluirEquipe(id).subscribe({
      next: () => {
        this.excluindoId = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Equipe excluída com sucesso',
        });
        this.carregarDados();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao excluir equipe:', err);
        this.excluindoId = null;
        if (err.status === 400) {
          const msg = err.error?.message;
          this.confirmationService.confirm({
            header: 'Ação Bloqueada',
            message: msg || 'Não foi possível excluir a equipe',
            icon: 'pi pi-exclamation-circle',
            acceptLabel: 'Ok',
            rejectVisible: false,
            acceptButtonProps: { severity: 'primary' },
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Houve um erro ao excluir a equipe',
          });
        }
      },
    });
  }

  protected filtrar() {
    this.buscaSubject.next();
  }

  protected limparBusca() {
    this.termoBusca = '';
    this.filtrar();
  }

  protected mudarPagina(event: PaginatorState) {
    this.paginaAtual = event.page ?? 0;
    this.tamanhoPagina = event.rows ?? 10;

    this.carregarDados();
  }

  protected abrirCadastro() {
    this.ref = this.dialogService.open(CriarEquipeComponent, {
      header: 'Criar Equipe',
      width: '60vw',
      modal: true,
      closable: true,
    });

    this.ref?.onClose.subscribe((equipe: EquipeExibicaoModel | null) => {
      if (equipe) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Equipe criada com sucesso',
        });
        this.carregarDados();
      }
    });
  }

  protected abrirEdicao(equipe: EquipeExibicaoModel) {
    this.ref = this.dialogService.open(CriarEquipeComponent, {
      header: 'Editar Equipe',
      width: '60vw',
      modal: true,
      closable: true,
      inputValues: {
        equipe: {
          ambulanciaId: equipe.ambulancia.id,
          ativo: equipe.ativo,
          profissionalIds: equipe.profissionais.map((p) => p.id),
        },
        idEditando: equipe.id,
        ambulanciaSelecionada: equipe.ambulancia,
        medicoSelecionadoId:
          equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.MEDICO)?.id || null,
        enfermeiroSelecionadoId:
          equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.ENFERMEIRO)?.id || null,
        condutorSelecionadoId:
          equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.CONDUTOR)?.id || null,
      },
    });

    this.ref?.onClose.subscribe((equipe: EquipeExibicaoModel | null) => {
      if (equipe) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Equipe atualizada com sucesso',
        });
        this.carregarDados();
      }
    });
  }

  getProfissionaisOrdenados(profissionais: ProfissionalExibicaoModel[]) {
    const ordem = {
      [FuncaoProfissional.MEDICO]: 1,
      [FuncaoProfissional.ENFERMEIRO]: 2,
      [FuncaoProfissional.CONDUTOR]: 3,
    };
    return [...profissionais].sort(
      (a, b) =>
        (ordem[a.funcao as FuncaoProfissional] || 99) -
        (ordem[b.funcao as FuncaoProfissional] || 99),
    );
  }
}
