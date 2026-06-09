import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { EquipesService } from '../../services/equipes-service/equipes-service';
import { EquipeCadastroModel, EquipeExibicaoModel } from '../../model/equipes.model';
import {
  FuncaoProfissional,
  FuncaoProfissionalLabel,
  ProfissionalExibicaoModel,
} from '../../model/profissional.model';
import {
  StatusAmbulancia,
  TipoAmbulancia,
  TipoAmbulanciaLabel,
} from '../../model/ambulancia.model';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { Tag } from 'primeng/tag';
import { NgClass } from '@angular/common';
import { SelectButton } from 'primeng/selectbutton';
import { Paginator, PaginatorState } from 'primeng/paginator';

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

          //todo apagar quando o backend estiver funcionando
          this.equipes = [
            {
              id: 101,
              ativo: true,
              ambulancia: {
                id: 1,
                placa: 'XYZ-1A23',
                tipo: TipoAmbulancia.UTI,
                status: StatusAmbulancia.EM_ATENDIMENTO,
                bairro: { id: 1, nome: 'Centro' },
              },
              profissionais: [
                {
                  id: 26,
                  nome: 'Davi Augusto',
                  funcao: FuncaoProfissional.MEDICO,
                  contato: 'daviaug23@gmail.com',
                },
                {
                  id: 17,
                  nome: 'Bianca Biquestre',
                  funcao: FuncaoProfissional.ENFERMEIRO,
                  contato: 'bibiquestre@yahoo.com.br',
                },
                {
                  id: 3,
                  nome: 'Dominic Toretto',
                  funcao: FuncaoProfissional.CONDUTOR,
                  contato: 'toretto@toretto.com',
                },
              ],
            },
            {
              id: 102,
              ativo: true,
              ambulancia: {
                id: 2,
                placa: 'QWE-9B87',
                tipo: TipoAmbulancia.BASICA,
                status: StatusAmbulancia.DISPONIVEL,
                bairro: { id: 2, nome: 'Setor Sul' },
              },
              profissionais: [
                {
                  id: 4,
                  nome: 'Paula Teixeira',
                  funcao: FuncaoProfissional.ENFERMEIRO,
                  contato: 'paula@gmail.com',
                },
                {
                  id: 27,
                  nome: 'Marcelo Ferreira',
                  funcao: FuncaoProfissional.CONDUTOR,
                  contato: 'celoferreira@yahoo.com',
                },
              ],
            },
            {
              id: 103,
              ativo: false,
              ambulancia: {
                id: 3,
                placa: 'RTY-5C44',
                tipo: TipoAmbulancia.BASICA,
                status: StatusAmbulancia.MANUTENCAO,
                bairro: { id: 3, nome: 'Jardim América' },
              },
              profissionais: [
                {
                  id: 6,
                  nome: 'Maria José',
                  funcao: FuncaoProfissional.ENFERMEIRO,
                  contato: 'maryjoseph@outlook.com',
                },
                {
                  id: 11,
                  nome: 'Rolando Barros',
                  funcao: FuncaoProfissional.CONDUTOR,
                  contato: 'fuirolando@yahoo.com.br',
                },
              ],
            },
            {
              id: 104,
              ativo: true,
              ambulancia: {
                id: 4,
                placa: 'HGF-3D21',
                tipo: TipoAmbulancia.UTI,
                status: StatusAmbulancia.DISPONIVEL,
                bairro: { id: 4, nome: 'Bueno' },
              },
              profissionais: [
                {
                  id: 2,
                  nome: 'Meredith Grey',
                  funcao: FuncaoProfissional.MEDICO,
                  contato: 'meredith@yahoo.com',
                },
                {
                  id: 9,
                  nome: 'Gabriela Lisboa',
                  funcao: FuncaoProfissional.ENFERMEIRO,
                  contato: 'gabrielisboa@gmail.com',
                },
                {
                  id: 24,
                  nome: 'Pericles',
                  funcao: FuncaoProfissional.CONDUTOR,
                  contato: 'periclys@outlook.com',
                },
              ],
            },
            {
              id: 105,
              ativo: true,
              ambulancia: {
                id: 5,
                placa: 'LMN-7E65',
                tipo: TipoAmbulancia.BASICA,
                status: StatusAmbulancia.EM_ATENDIMENTO,
                bairro: { id: 5, nome: 'Campinas' },
              },
              profissionais: [
                {
                  id: 13,
                  nome: 'Joana Darc',
                  funcao: FuncaoProfissional.ENFERMEIRO,
                  contato: 'joanadarc@joana.com',
                },
                {
                  id: 12,
                  nome: 'Um Dois Tres de Oliveira',
                  funcao: FuncaoProfissional.CONDUTOR,
                  contato: 'umdoistres@gmail.com',
                },
              ],
            },
            {
              id: 106,
              ativo: true,
              ambulancia: {
                id: 6,
                placa: 'VBN-0F98',
                tipo: TipoAmbulancia.UTI,
                status: StatusAmbulancia.DISPONIVEL,
                bairro: { id: 1, nome: 'Centro' },
              },
              profissionais: [
                {
                  id: 1,
                  nome: 'Drauzio Varella',
                  funcao: FuncaoProfissional.MEDICO,
                  contato: 'drauzio@gmail.com',
                },
                {
                  id: 14,
                  nome: 'Luiz Felipe',
                  funcao: FuncaoProfissional.ENFERMEIRO,
                  contato: 'felipito@outlook.com',
                },
                {
                  id: 10,
                  nome: 'Juremaldo Sales',
                  funcao: FuncaoProfissional.CONDUTOR,
                  contato: 'juremildo@outlook.com',
                },
              ],
            },
          ];
          this.totalElementos = this.equipes.length;

          this.cd.markForCheck();
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
    this.equipeCadastrada = {
      ambulanciaId: equipe.ambulancia.id,
      ativo: equipe.ativo,
      profissionaisIds: equipe.profissionais.map((p) => p.id),
    };
    this.equipeOriginal = {
      ...this.equipeCadastrada,
      profissionaisIds: [...this.equipeCadastrada.profissionaisIds],
    };
    this.cadastroVisivel = true;
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
