import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, finalize, forkJoin, Subject, Subscription } from 'rxjs';
import { EquipesService } from '../../services/equipes-service/equipes-service';
import { EquipeCadastroModel, EquipeExibicaoModel } from '../../model/equipes.model';
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
import { AmbulanciasService } from '../../services/ambulancias-service/ambulancias-service';
import { ProfissionaisService } from '../../services/profissionais-service/profissionais-service';

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
  providers: [MessageService, ConfirmationService],
  templateUrl: './equipes-component.html',
  styleUrl: './equipes-component.css',
})
export class EquipesComponent implements OnInit, OnDestroy {
  private equipesService = inject(EquipesService);
  private ambulanciasService = inject(AmbulanciasService);
  private profissionaisService = inject(ProfissionaisService);
  private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  @ViewChild('cadastroForm') cadastroForm!: NgForm;

  equipes: EquipeExibicaoModel[] = [];

  carregando: boolean = true;
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

  cadastroVisivel = false;
  carregandoCadastro = false;
  equipeCadastrada: EquipeCadastroModel = {
    ambulanciaId: null,
    ativo: true,
    profissionaisIds: [],
  };
  ambulanciaSelecionada: any = null;
  condutorSelecionadoId: number | null = null;
  enfermeiroSelecionadoId: number | null = null;
  medicoSelecionadoId: number | null = null;

  ambulanciasDisponiveis: any[] = [];
  condutoresDisponiveis: any[] = [];
  enfermeirosDisponiveis: any[] = [];
  medicosDisponiveis: any[] = [];

  idEditando: number | null = null;
  equipeOriginal: EquipeCadastroModel | null = null;
  erroBackend: string | null = null;
  tipoUTI = TipoAmbulancia.UTI;

  private buscaSubject = new Subject<void>();
  private buscaSubscription!: Subscription;

  ngOnInit(): void {
    //todo carregar os disponiveis - o backend precisa de um metodo que retorne ambulancias e profissionais sem equipe
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

  private excluirEquipe(id: number) {}

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
    this.idEditando = null;
    this.ambulanciaSelecionada = null;
    this.condutorSelecionadoId = null;
    this.enfermeiroSelecionadoId = null;
    this.medicoSelecionadoId = null;

    this.carregarDadosFormulario();
    this.cadastroVisivel = true;
  }

  protected fecharCadastro() {
    this.cadastroVisivel = false;
    this.equipeCadastrada = {
      ambulanciaId: null,
      ativo: true,
      profissionaisIds: [],
    };
    this.idEditando = null;
    this.equipeOriginal = null;
    setTimeout(() => {
      this.cadastroForm.resetForm();
    }, 0);
  }

  protected abrirEdicao(equipe: EquipeExibicaoModel) {
    this.idEditando = equipe.id;
    this.cadastroVisivel = true;

    this.carregarDadosFormulario(equipe.id);

    this.equipeCadastrada = {
      ambulanciaId: equipe.ambulancia.id,
      ativo: equipe.ativo,
      profissionaisIds: equipe.profissionais.map((p) => p.id),
    };

    this.ambulanciaSelecionada = equipe.ambulancia;
    this.medicoSelecionadoId =
      equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.MEDICO)?.id || null;
    this.enfermeiroSelecionadoId =
      equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.ENFERMEIRO)?.id || null;
    this.condutorSelecionadoId =
      equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.CONDUTOR)?.id || null;

    this.equipeOriginal = {
      ...this.equipeCadastrada,
      profissionaisIds: [...this.equipeCadastrada.profissionaisIds],
    };
  }

  get semAlteracoes(): boolean {
    if (!this.idEditando || !this.equipeOriginal) return false;

    const idsAtuais = [...this.equipeCadastrada.profissionaisIds].sort().join(',');
    const idsOriginais = [...this.equipeOriginal.profissionaisIds].sort().join(',');

    return (
      this.equipeCadastrada.ambulanciaId === this.equipeOriginal.ambulanciaId &&
      this.equipeCadastrada.ativo === this.equipeOriginal.ativo &&
      idsAtuais === idsOriginais
    );
  }

  get medicoObrigatorio(): boolean {
    return this.ambulanciaSelecionada.tipo === this.tipoUTI;
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
