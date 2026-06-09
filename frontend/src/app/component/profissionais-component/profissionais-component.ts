import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProfissionaisService } from '../../services/profissionais-service/profissionais-service';
import {
  FuncaoProfissional,
  FuncaoProfissionalLabel,
  ProfissionalCadastroModel,
  ProfissionalExibicaoModel,
} from '../../model/profissional.model';
import { Table, TableModule } from 'primeng/table';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { TabelaOrdenacao } from '../tabela-ordenacao';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { Tooltip } from 'primeng/tooltip';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { NgClass } from '@angular/common';
import { Select } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profissionais-component',
  imports: [
    TableModule,
    Button,
    Skeleton,
    Tooltip,
    IconField,
    InputIcon,
    InputText,
    FormsModule,
    Dialog,
    NgClass,
    Select,
    Toast,
    ConfirmDialog,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './profissionais-component.html',
  styleUrl: './profissionais-component.css',
})
export class ProfissionaisComponent extends TabelaOrdenacao implements OnInit, OnDestroy {
  private profissionaisService = inject(ProfissionaisService);
  private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  @ViewChild('cadastroForm') cadastroForm!: NgForm;
  @ViewChild('tabelaProfissionais') tabela!: Table;

  profissionais: ProfissionalExibicaoModel[] = [];

  totalElementos = 0;
  termoBusca: string = '';
  funcaoLabel = FuncaoProfissionalLabel;

  cadastroVisivel = false;
  profissionalCadastrado: ProfissionalCadastroModel = {
    nome: '',
    funcao: null,
    contato: '',
  };
  funcoes = [
    { label: 'Enfermeiro', value: FuncaoProfissional.ENFERMEIRO },
    { label: 'Médico', value: FuncaoProfissional.MEDICO },
    { label: 'Condutor', value: FuncaoProfissional.CONDUTOR },
  ];
  idEditando: number | null = null;
  profissionalOriginal: ProfissionalCadastroModel | null = null;
  erroBackend: string | null = null;

  private buscaSubject = new Subject<void>();
  private buscaSubscription!: Subscription;

  ngOnInit(): void {
    this.buscaSubscription = this.buscaSubject.pipe(debounceTime(300)).subscribe(() => {
      this.paginaAtual = 0;
      this.carregarDados();
    });
  }

  ngOnDestroy(): void {
    this.buscaSubscription.unsubscribe();
  }

  protected override carregarDados(): void {
    this.carregando = true;

    this.profissionaisService
      .obterProfissionais(
        this.paginaAtual,
        this.tamanhoPagina,
        this.campoOrdenacao,
        this.ordemOrdenacao ?? -1,
        this.termoBusca,
      )
      .subscribe({
        next: (dados) => {
          this.profissionais = dados.content;
          this.totalElementos = dados.page.totalElements;
          this.carregando = false;
          this.cd.markForCheck();
        },
        error: (err) => {
          console.log('Erro ao obter profissionais: ', err);
        },
      });
  }

  protected salvarProfissional() {
    if (this.cadastroForm?.invalid) return;

    if (!this.profissionalCadastrado.contato.includes('@')) {
      this.cadastroForm.controls['email'].setErrors({ email: true });
      return;
    }

    if (this.profissionalCadastrado.contato.length > 50) {
      this.cadastroForm.controls['email'].setErrors({ maxlength: true });
      return;
    }

    this.erroBackend = null;

    const request = this.idEditando
      ? this.profissionaisService.atualizarProfissional(
          this.idEditando,
          this.profissionalCadastrado,
        )
      : this.profissionaisService.criarProfissional(this.profissionalCadastrado);

    const mensagemSucesso = this.idEditando
      ? 'Profissional atualizado com sucesso'
      : 'Profissional cadastrado com sucesso';


    request.subscribe({
      next: () => {
        this.exibirToast('success', 'Sucesso', mensagemSucesso);
        this.atualizarLista(true);
      },
      error: (err: HttpErrorResponse) => {
        this.tratarErroSalvar(err);
      },
    });
  }

  protected confirmarExclusao(profissional: ProfissionalExibicaoModel) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o funcionário ${profissional.nome}?`,
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
        this.excluirProfissional(profissional.id);
      },
    });
  }

  private excluirProfissional(id: number) {
    this.profissionaisService.excluirProfissional(id).subscribe({
      next: () => {
        this.exibirToast('success', 'Sucesso', 'Profissional excluído com sucesso');
        this.atualizarLista(false);
      },
      error: (err: HttpErrorResponse) => {
        this.tratarErroExcluir(err);
      },
    });
  }

  private tratarErroSalvar(err: HttpErrorResponse) {
    if (err.status !== 400) {
      this.exibirToast('error', 'Erro', 'Houve um erro');
      console.error('Erro na requisição: ', err);
      return;
    }

    const msg = err.error?.message;

    switch (msg) {
      case 'Já existe um profissional cadastrado com esse nome':
        this.cadastroForm.controls['nome'].setErrors({ duplicate: true });
        break;
      case 'O nome não pode ter mais de 100 caracteres':
        this.cadastroForm.controls['nome'].setErrors({ maxlength: true });
        break;
      case 'O e-mail não pode ter mais de 50 caracteres':
        this.cadastroForm.controls['email'].setErrors({ maxlength: true });
        break;
      case 'O e-mail informado não é válido':
        this.cadastroForm.controls['email'].setErrors({ email: true });
        break;
      case 'Não é possível alterar a função de um profissional alocado em equipe ativa':
        this.exibirToast('error', 'Erro', msg);
        this.atualizarLista(true);
        break;
      default:
        this.erroBackend = msg;
        break;
    }
  }

  private tratarErroExcluir(err: HttpErrorResponse) {
    if (err.status === 400) {
      this.confirmationService.confirm({
        header: 'Ação Bloqueada',
        message: err.error?.message || 'Não foi possível excluir o profissional',
        icon: 'pi pi-exclamation-circle',
        acceptLabel: 'Ok',
        rejectVisible: false,
        acceptButtonProps: { severity: 'primary' },
      });
    } else {
      this.exibirToast('error', 'Erro', 'Houve um erro ao excluir');
      console.error('Erro ao excluir: ', err);
    }
  }

  private exibirToast(severity: 'success' | 'error', summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  private atualizarLista(fecharModal = false) {
    this.limparBusca();
    this.limparOrdenacao();
    this.carregarDados();
    if (fecharModal) this.fecharCadastro();
  }

  protected getFuncaoLabel(funcao: any): string {
    return this.funcaoLabel[funcao as FuncaoProfissional] || funcao;
  }

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
    this.profissionalCadastrado = {
      nome: '',
      funcao: null,
      contato: '',
    };
    this.cadastroVisivel = true;
  }

  protected fecharCadastro() {
    this.cadastroVisivel = false;
    this.profissionalCadastrado = {
      nome: '',
      funcao: null,
      contato: '',
    };
    this.idEditando = null;
    this.profissionalOriginal = null;
    setTimeout(() => {
      this.cadastroForm.resetForm();
    }, 0);
  }

  protected abrirEdicao(profissional: ProfissionalExibicaoModel) {
    this.idEditando = profissional.id;
    this.profissionalCadastrado = {
      nome: profissional.nome,
      funcao: profissional.funcao,
      contato: profissional.contato,
    };
    this.profissionalOriginal = { ...this.profissionalCadastrado };
    this.cadastroVisivel = true;
  }

  get semAlteracoes(): boolean {
    if (!this.idEditando || !this.profissionalOriginal) return false;
    return (
      this.profissionalCadastrado.nome === this.profissionalOriginal.nome &&
      this.profissionalCadastrado.funcao === this.profissionalOriginal.funcao &&
      this.profissionalCadastrado.contato === this.profissionalOriginal.contato
    );
  }
}
