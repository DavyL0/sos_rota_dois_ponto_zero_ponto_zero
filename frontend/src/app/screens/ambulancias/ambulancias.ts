import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AmbulanciasService } from '../../services/ambulancias-service/ambulancias-service';
import {
  AmbulanciaCadastroModel,
  AmbulanciaExibicaoModel,
  StatusAmbulancia,
  StatusAmbulanciaLabel,
  TipoAmbulancia,
  TipoAmbulanciaLabel,
} from '../../model/ambulancia.model';
import { Button } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { Skeleton } from 'primeng/skeleton';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, finalize, forkJoin, Subject, Subscription } from 'rxjs';
import { Toast } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';
import { Select } from 'primeng/select';
import { Bairro } from '../../model/bairro.model';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { TabelaOrdenacao } from '../../component/tabela-ordenacao';
import { BairroService } from '../../services/bairro-service/bairro-service';

@Component({
  selector: 'app-ambulancias',
  imports: [
    Button,
    TableModule,
    Tag,
    Tooltip,
    Skeleton,
    IconField,
    InputIcon,
    InputText,
    FormsModule,
    Toast,
    Dialog,
    NgClass,
    Select,
    ConfirmDialog,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './ambulancias.html',
  styleUrl: './ambulancias.css',
})
export class Ambulancias extends TabelaOrdenacao implements OnInit, OnDestroy {
  private ambulanciasService = inject(AmbulanciasService);
  private bairrosService = inject(BairroService);
  private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  @ViewChild('cadastroForm') cadastroForm!: NgForm;
  @ViewChild('tabelaAmbulancias') tabela!: Table;

  ambulancias: AmbulanciaExibicaoModel[] = [];
  bairros: Bairro[] = [];

  cadastroVisivel = false;
  ambulanciaCadastrada: AmbulanciaCadastroModel = {
    placa: '',
    status: StatusAmbulancia.INATIVA,
    tipo: null,
    bairroId: null,
  };
  tiposAmbulancia = [
    { label: 'Básica', value: TipoAmbulancia.BASICA },
    { label: 'UTI', value: TipoAmbulancia.UTI },
  ];
  erroBackend: string | null = null;
  idEditando: number | null = null;
  ambulanciaOriginal: AmbulanciaCadastroModel | null = null;
  totalElementos = 0;
  termoBusca: string = '';
  statusLabel = StatusAmbulanciaLabel;
  tipoLabel = TipoAmbulanciaLabel;

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

  protected override carregarDados() {
    this.carregando = true;
    forkJoin({
      bairros: this.bairrosService.obterBairros(),
      ambulancias: this.ambulanciasService.obterAmbulancias(
        this.paginaAtual,
        this.tamanhoPagina,
        this.campoOrdenacao,
        this.ordemOrdenacao ?? -1,
        this.termoBusca,
      ),
    })
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cd.markForCheck();
        }),
      )
      .subscribe({
        next: ({ bairros, ambulancias }) => {
          this.bairros = bairros;
          this.ambulancias = ambulancias.content;
          this.totalElementos = ambulancias.page.totalElements;
        },
        error: (err) => {
          console.error('Erro ao carregar os dados: ', err);
        },
      });
  }

  protected salvarAmbulancia() {
    if (this.cadastroForm?.invalid) return;

    if (!this.ambulanciaCadastrada.placa.match('^[A-Z]{3}[0-9][A-Z][0-9]{2}$')) {
      this.cadastroForm.controls['placa'].setErrors({ pattern: true });
      return;
    }

    this.erroBackend = null;

    const request = this.idEditando
      ? this.ambulanciasService.atualizarAmbulancia(this.idEditando, this.ambulanciaCadastrada)
      : this.ambulanciasService.criarAmbulancia(this.ambulanciaCadastrada);

    const mensagemSucesso = this.idEditando
      ? 'Ambulância atualizada com sucesso'
      : 'Ambulância cadastrada com sucesso';

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

  protected confirmarExclusao(ambulancia: AmbulanciaExibicaoModel) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a ambulância placa ${ambulancia.placa}?`,
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
        this.excluirAmbulancia(ambulancia.id);
      },
    });
  }

  private excluirAmbulancia(ambulanciaId: number) {
    this.ambulanciasService.apagarAmbulancia(ambulanciaId).subscribe({
      next: () => {
        this.exibirToast('success', 'Sucesso', 'Ambulância excluída com sucesso');
        this.atualizarLista(false);
      },
      error: (err: HttpErrorResponse) => {
        this.tratarErroExcluir(err);
      },
    });
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

  private tratarErroSalvar(err: HttpErrorResponse) {
    if (err.status !== 400) {
      this.exibirToast('error', 'Erro', 'Houve um erro');
      console.error('Erro na requisição: ', err);
      return;
    }

    const msg = err.error?.message;

    switch (msg) {
      case 'Já existe uma ambulância cadastrada com essa placa':
        this.cadastroForm.controls['placa'].setErrors({ unique: true });
        break;
      case 'A placa deve seguir o formato ABC1D23':
        this.cadastroForm.controls['placa'].setErrors({ pattern: true });
        break;
      case 'Não é possível atualizar uma ambulância em atendimento':
      case 'Não é possível atualizar uma ambulância vinculada a uma equipe':
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
        message: err.error?.message || 'Não foi possível excluir a ambulância',
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

  protected getSeverityStatus(
    status: StatusAmbulancia,
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined | null {
    switch (status) {
      case StatusAmbulancia.DISPONIVEL:
        return 'success';
      case StatusAmbulancia.EM_ATENDIMENTO:
        return 'info';
      case StatusAmbulancia.MANUTENCAO:
        return 'warn';
      case StatusAmbulancia.INATIVA:
        return 'secondary';
      case StatusAmbulancia.DESATIVADA:
        return 'danger';
      default:
        return 'info';
    }
  }

  protected getTipoLabel(tipo: any): string {
    return this.tipoLabel[tipo as TipoAmbulancia] || tipo;
  }

  protected getStatusLabel(status: any): string {
    return this.statusLabel[status as StatusAmbulancia] || status;
  }

  protected filtrarTabela() {
    this.buscaSubject.next();
  }

  protected limparOrdenacao() {
    this.tabela.sortField = null;
    this.tabela.sortOrder = 1;
    this.tabela.reset();
  }

  protected limparBusca() {
    this.termoBusca = '';
    this.filtrarTabela();
  }

  protected abrirCadastro() {
    this.idEditando = null;
    this.ambulanciaCadastrada = {
      placa: '',
      status: StatusAmbulancia.INATIVA,
      tipo: null,
      bairroId: null,
    };
    this.cadastroVisivel = true;
  }

  protected fecharCadastro() {
    this.cadastroVisivel = false;
    this.ambulanciaCadastrada = {
      placa: '',
      status: StatusAmbulancia.INATIVA,
      tipo: null,
      bairroId: null,
    };
    this.idEditando = null;
    this.ambulanciaOriginal = null;
    this.erroBackend = null;
    setTimeout(() => {
      this.cadastroForm?.resetForm();
    }, 0);
  }

  protected abrirEdicao(ambulancia: AmbulanciaExibicaoModel) {
    this.idEditando = ambulancia.id;
    this.ambulanciaCadastrada = {
      placa: ambulancia.placa,
      status: ambulancia.status,
      tipo: ambulancia.tipo,
      bairroId: ambulancia.bairro.id,
    };
    this.ambulanciaOriginal = { ...this.ambulanciaCadastrada };
    this.cadastroVisivel = true;
  }

  get semAlteracoes(): boolean {
    if (!this.idEditando || !this.ambulanciaOriginal) return false;
    return (
      this.ambulanciaOriginal.placa === this.ambulanciaCadastrada.placa &&
      this.ambulanciaOriginal.status === this.ambulanciaCadastrada.status &&
      this.ambulanciaOriginal.tipo === this.ambulanciaCadastrada.tipo &&
      this.ambulanciaOriginal.bairroId === this.ambulanciaCadastrada.bairroId
    );
  }
}
