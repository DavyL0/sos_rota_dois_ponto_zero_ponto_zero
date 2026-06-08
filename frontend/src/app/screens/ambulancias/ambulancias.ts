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
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { Skeleton } from 'primeng/skeleton';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Toast } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';
import { Select } from 'primeng/select';
import { Bairro } from '../../model/bairro.model';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { HttpErrorResponse } from '@angular/common/http';

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
export class Ambulancias implements OnInit, OnDestroy {
  private service = inject(AmbulanciasService);
  private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  @ViewChild('cadastroForm') cadastroForm!: NgForm;
  @ViewChild('tabelaAmbulancias') tabela!: Table;

  ambulancias: AmbulanciaExibicaoModel[] = [];
  carregando: boolean = true;

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
  bairros: Bairro[] = [
    //todo receber os bairros do backend
    { id: 1, nome: 'Centro' },
  ];
  erroBackend: string | null = null;
  idEditando: number | null = null;

  paginaAtual = 0;
  tamanhoPagina = 10;
  totalElementos = 0;
  campoOrdenacao?: string;
  ordemOrdenacao: number | undefined | null = -1;
  termoBusca: string = '';
  statusLabel = StatusAmbulanciaLabel;
  tipoLabel = TipoAmbulanciaLabel;

  private buscaSubject = new Subject<void>();
  private buscaSubscription!: Subscription;

  ngOnInit(): void {
    this.buscaSubscription = this.buscaSubject.pipe(debounceTime(300)).subscribe(() => {
      this.paginaAtual = 0;
      this.carregarAmbulancias();
    });
  }

  ngOnDestroy(): void {
    this.buscaSubscription.unsubscribe();
  }

  protected carregarTabela(event: TableLazyLoadEvent) {
    this.carregando = true;

    const first = event.first ?? 0;
    const rows = event.rows ?? this.tamanhoPagina;
    this.paginaAtual = Math.floor(first / rows);
    this.tamanhoPagina = rows;

    this.campoOrdenacao = event.sortField as string;
    this.ordemOrdenacao = event.sortOrder;

    this.carregarAmbulancias();
  }

  protected carregarAmbulancias() {
    this.carregando = true;
    this.service
      .obterAmbulancias(
        this.paginaAtual,
        this.tamanhoPagina,
        this.campoOrdenacao,
        this.ordemOrdenacao ?? -1,
        this.termoBusca,
      )
      .subscribe({
        next: (dados) => {
          this.ambulancias = dados.content;
          this.totalElementos = dados.page.totalElements;
          this.carregando = false;
          this.cd.markForCheck();
        },
        error: (err) => {
          console.log('Erro ao obter ambulancias: ', err);
          this.carregando = false;
          this.cd.markForCheck();
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

    if (this.idEditando) {
/*      this.service.atualizarAmbulancia(this.idEditando, this.ambulanciaCadastrada).subscribe({
        next: () => {
          this.limparBusca();
          this.limparOrdenacao();
          this.carregarAmbulancias();
          this.fecharCadastro();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Ambulância atualizada com sucesso',
          });
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400) {
            if (err.error?.message === 'Já existe uma ambulância cadastrada com essa placa') {
              this.cadastroForm.controls['placa'].setErrors({ unique: true });
            } else {
              this.erroBackend = err.error.message;
            }
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Houve um erro',
            });
            console.log('Erro ao editar ', err);
          }
        },
      });*/
    } else {
/*      this.service.criarAmbulancia(this.ambulanciaCadastrada).subscribe({
        next: () => {
          this.limparBusca();
          this.limparOrdenacao();
          this.carregarAmbulancias();
          this.fecharCadastro();
        },
        error: (err: HttpErrorResponse) => {
          //todo gerenciar os tipos de erros pra jogar no formulario OU no toast
        },
      });*/
    }
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
    this.service.apagarAmbulancia(ambulanciaId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ambulância excluída com sucesso',
        });
        this.limparBusca();
        this.limparOrdenacao();
        this.carregarAmbulancias();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          const mensagemErro = err.error?.message || 'Não foi possível excluir a ambulância';
          this.confirmationService.confirm({
            header: 'Ação Bloqueada',
            message: mensagemErro,
            icon: 'pi pi-exclamation-circle',
            acceptLabel: 'Ok',
            rejectVisible: false,
            acceptButtonProps: {
              severity: 'primary',
            },
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Houve um erro',
          });
          console.log('Erro ao excluir ', err);
        }
      },
    });
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
    this.cadastroVisivel = true;
  }
}
