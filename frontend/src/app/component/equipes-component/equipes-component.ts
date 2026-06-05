import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Skeleton } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabelaOrdenacao } from '../tabela-ordenacao';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { EquipesService } from '../../services/equipes-service/equipes-service';
import { EquipeCadastroModel, EquipeExibicaoModel } from '../../model/equipes.model';
import { FuncaoProfissional } from '../../model/profissional.model';
import { AmbulanciaExibicaoModel, TipoAmbulancia } from '../../model/ambulancia.model';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-equipes-component',
  imports: [
    Button,
    ConfirmDialog,
    Dialog,
    FormsModule,
    IconField,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    Select,
    Skeleton,
    TableModule,
    Toast,
    Tooltip,
    Checkbox,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './equipes-component.html',
  styleUrl: './equipes-component.css',
})
export class EquipesComponent extends TabelaOrdenacao implements OnInit, OnDestroy {
  private equipesService = inject(EquipesService);
  private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  @ViewChild('cadastroForm') cadastroForm!: NgForm;
  @ViewChild('tabelaEquipes') tabela!: Table;

  equipes: EquipeExibicaoModel[] = [];

  totalElementos = 0;
  termoBusca: string = '';

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
  }

  ngOnDestroy(): void {
    this.buscaSubscription.unsubscribe();
  }

  protected override carregarDados() {}

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

  protected filtrarTabela() {
    this.buscaSubject.next();
  }

  protected limparBusca() {
    this.termoBusca = '';
    this.filtrarTabela();
  }

  protected limparOrdenacao() {
    this.tabela.sortField = null;
    this.tabela.sortOrder = 1;
    this.tabela.reset();
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

  protected getAmbulanciaLabel(ambulancia: AmbulanciaExibicaoModel) {
    return `${ambulancia.placa} (${ambulancia.tipo})`;
  }

  protected getAmbulanciaBase(ambulancia: AmbulanciaExibicaoModel) {
    return ambulancia.bairro.nome;
  }

  protected getMedico(equipe: EquipeExibicaoModel) {
    const medico = equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.MEDICO);
    return medico ? medico.nome : '-';
  }

  protected getEnfermeiro(equipe: EquipeExibicaoModel) {
    const enfermeiro = equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.ENFERMEIRO);
    return enfermeiro?.nome;
  }

  protected getCondutor(equipe: EquipeExibicaoModel) {
    const condutor = equipe.profissionais.find((p) => p.funcao === FuncaoProfissional.CONDUTOR);
    return condutor?.nome;
  }
}
