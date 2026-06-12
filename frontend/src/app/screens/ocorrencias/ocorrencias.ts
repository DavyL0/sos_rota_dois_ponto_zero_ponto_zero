import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TabelaOrdenacao } from '../../component/tabela-ordenacao';
import { Button } from 'primeng/button';
import {
  GravidadeOcorrencia,
  GravidadeOcorrenciaLabel,
  OcorrenciaExibicaoModel,
  StatusOcorrencia,
  StatusOcorrenciaLabel,
} from '../../model/ocorrencias.model';
import { OcorrenciasService } from '../../services/ocorrencias-service/ocorrencias-service';
import { Table, TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { Tooltip } from 'primeng/tooltip';
import { NgClass } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OcorrenciaDetalhesComponent } from '../../component/ocorrencia-detalhes-component/ocorrencia-detalhes-component';
import { OcorrenciaCadastrarComponent } from '../../component/ocorrencia-cadastrar-component/ocorrencia-cadastrar-component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { OcorrenciaCancelarComponent } from '../../component/ocorrencia-cancelar-component/ocorrencia-cancelar-component';
import { DespacharOcorrenciaComponent } from '../../component/despachar-ocorrencia-component/despachar-ocorrencia-component';
import { BairroService } from '../../services/bairro-service/bairro-service';
import { Bairro } from '../../model/bairro.model';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-ocorrencias',
  imports: [
    Button,
    TableModule,
    Skeleton,
    Tooltip,
    NgClass,
    ConfirmDialog,
    Toast,
    Select,
    FormsModule,
    Tag,
  ],
  providers: [DialogService, DynamicDialogRef, ConfirmationService, MessageService],
  templateUrl: './ocorrencias.html',
  styleUrl: './ocorrencias.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ocorrencias extends TabelaOrdenacao implements OnInit, OnDestroy {
  private ocorrenciasService = inject(OcorrenciasService);
  private bairroService = inject(BairroService);
  private cd = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private ref: DynamicDialogRef | null = inject(DynamicDialogRef);
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  @ViewChild('tabelaOcorrencias') tabela!: Table;

  ocorrencias: OcorrenciaExibicaoModel[] = [];
  bairros: Bairro[] = [];

  totalElementos = 0;

  deletandoId: number | null = null;

  bairroFiltroId: number | null = null;
  gravidadeFiltro: GravidadeOcorrencia | null = null;
  statusFiltro: StatusOcorrencia | null = null;

  protected readonly StatusOcorrencia = StatusOcorrencia;
  gravidadeLabel = GravidadeOcorrenciaLabel;
  statusLabel = StatusOcorrenciaLabel;

  tiposGravidade = [
    { label: 'Alta', value: GravidadeOcorrencia.ALTA },
    { label: 'Média', value: GravidadeOcorrencia.MEDIA },
    { label: 'Baixa', value: GravidadeOcorrencia.BAIXA },
  ];

  tiposStatus = [
    { label: 'Aberta', value: StatusOcorrencia.ABERTA },
    { label: 'Despachada', value: StatusOcorrencia.DESPACHADA },
    { label: 'Em atendimento', value: StatusOcorrencia.EM_ATENDIMENTO },
    { label: 'Concluída', value: StatusOcorrencia.CONCLUIDA },
    { label: 'Cancelada', value: StatusOcorrencia.CANCELADA },
  ];

  private timerSubscription!: Subscription;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.timerSubscription = interval(1000).subscribe(() => {
        this.atualizarSla();
        this.cd.detectChanges();
      });
    });

    this.bairroService.obterBairros().subscribe({
      next: (dados) => {
        this.bairros = dados;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.log('Erro ao carregar bairros ', err);
      },
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  protected override carregarDados(): void {
    this.carregando = true;
    this.ocorrenciasService
      .obterOcorrencias(
        this.paginaAtual,
        this.tamanhoPagina,
        this.campoOrdenacao,
        this.ordemOrdenacao ?? -1,
        this.gravidadeFiltro ?? undefined,
        this.bairroFiltroId ?? undefined,
        this.statusFiltro ?? undefined,
      )
      .subscribe({
        next: (dados) => {
          this.ocorrencias = dados.content;
          this.totalElementos = dados.page.totalElements;
          this.carregando = false;
          this.atualizarSla();
          this.cd.markForCheck();
        },
        error: (err) => {
          console.log('Erro ao carregar ocorrências:', err);
          this.carregando = false;
          this.cd.markForCheck();
        },
      });
  }

  protected cancelarOcorrencia(ocorrencia: OcorrenciaExibicaoModel) {
    this.ref = this.dialogService.open(OcorrenciaCancelarComponent, {
      header: 'Cancelar Ocorrência',
      width: '60vw',
      modal: true,
      closable: true,
      inputValues: {
        idEditando: ocorrencia.id,
      },
    });

    this.ref?.onClose.subscribe((ocorrencia: OcorrenciaExibicaoModel | null) => {
      if (ocorrencia) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ocorrência atualizada com sucesso',
        });
        this.carregarDados();
      }
    });
  }

  protected confirmarExclusao(ocorrencia: OcorrenciaExibicaoModel) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a ocorrência?`,
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
        this.excluirOcorrencia(ocorrencia);
      },
    });
  }

  private excluirOcorrencia(ocorrencia: OcorrenciaExibicaoModel) {
    this.deletandoId = ocorrencia.id;
    if (ocorrencia.statusOcorrencia !== StatusOcorrencia.ABERTA) {
      this.confirmationService.confirm({
        header: 'Ação Bloqueada',
        message: 'Não é possível deletar uma ocorrência com histórico. Cancele-a, em vez disso.',
        icon: 'pi pi-exclamation-circle',
        acceptLabel: 'Ok',
        rejectVisible: false,
        acceptButtonProps: { severity: 'primary' },
      });
      this.deletandoId = null;
      return;
    }
    this.ocorrenciasService.excluirOcorrencia(ocorrencia.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ocorrência excluída com sucesso',
        });
        this.deletandoId = null;
        this.carregarDados();
      },
      error: (err: HttpErrorResponse) => {
        console.log('Erro ao excluir ocorrência:', err);
        this.deletandoId = null;
        if (err.status === 400) {
          this.confirmationService.confirm({
            header: 'Ação Bloqueada',
            message: err.error.message,
            icon: 'pi pi-exclamation-circle',
            acceptLabel: 'Ok',
            rejectVisible: false,
            acceptButtonProps: { severity: 'primary' },
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Houve um erro ao excluir a ocorrência',
          });
        }
      },
    });
  }

  protected filtrarTabela() {
    if (this.tabela) {
      this.tabela.reset();
    }
  }

  abrirDespachar(ocorrencia: OcorrenciaExibicaoModel) {
    this.ref = this.dialogService.open(DespacharOcorrenciaComponent, {
      header: 'Despachar ambulância',
      width: '60vw',
      modal: true,
      closable: true,
      inputValues: {
        ocorrenciaDespacho: ocorrencia,
      },
    });
  }

  abrirCadastrar() {
    this.ref = this.dialogService.open(OcorrenciaCadastrarComponent, {
      header: 'Adicionar nova ocorrência',
      width: '60vw',
      modal: true,
      closable: true,
    });

    this.ref?.onClose.subscribe((result) => {
      if (result) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ocorrência criada com sucesso',
        });
        this.carregarDados();
      }
    });
  }

  abrirEditar(ocorrencia: OcorrenciaExibicaoModel) {
    if (
      ocorrencia.statusOcorrencia === StatusOcorrencia.CANCELADA ||
      ocorrencia.statusOcorrencia === StatusOcorrencia.CONCLUIDA
    ) {
      this.confirmationService.confirm({
        header: 'Ação Bloqueada',
        message: 'Não é possível editar ocorrências finalizadas.',
        icon: 'pi pi-exclamation-circle',
        acceptLabel: 'Ok',
        rejectVisible: false,
        acceptButtonProps: { severity: 'primary' },
      });
      return;
    }

    this.ref = this.dialogService.open(OcorrenciaCadastrarComponent, {
      header: 'Editar ocorrência',
      width: '60vw',
      modal: true,
      closable: true,
      inputValues: {
        ocorrenciaEditando: ocorrencia,
      },
    });

    this.ref?.onClose.subscribe((result) => {
      if (result) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ocorrência atualizada com sucesso',
        });
        this.carregarDados();
      }
    });
  }

  abrirDetalhes(ocorrencia: OcorrenciaExibicaoModel) {
    this.ref = this.dialogService.open(OcorrenciaDetalhesComponent, {
      header: `Histórico da ocorrência #${ocorrencia.id}`,
      width: '60vw',
      modal: true,
      closable: true,
      focusOnShow: false,
      inputValues: { ocorrencia: ocorrencia },
    });
  }

  protected limparFiltros() {
    this.gravidadeFiltro = null;
    this.bairroFiltroId = null;
    this.statusFiltro = null;
    this.filtrarTabela();
  }

  protected limparOrdenacao() {
    this.tabela.sortField = null;
    this.tabela.sortOrder = 1;
    this.tabela.reset();
  }

  getGravidadeLabel(gravidade: GravidadeOcorrencia): string {
    return this.gravidadeLabel[gravidade] || gravidade;
  }

  getStatusLabel(status: StatusOcorrencia): string {
    return this.statusLabel[status] || status;
  }

  getGravidadeSeverity(
    gravidade: GravidadeOcorrencia,
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (gravidade) {
      case GravidadeOcorrencia.ALTA:
        return 'danger';
      case GravidadeOcorrencia.MEDIA:
        return 'warn';
      case GravidadeOcorrencia.BAIXA:
        return 'info';
      default:
        return 'secondary';
    }
  }
  getStatusSeverity(
    status: StatusOcorrencia,
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (status) {
      case StatusOcorrencia.ABERTA:
        return 'info'; // Azul
      case StatusOcorrencia.DESPACHADA:
        return 'warn'; // Laranja
      case StatusOcorrencia.EM_ATENDIMENTO:
        return 'warn'; // Laranja
      case StatusOcorrencia.CONCLUIDA:
        return 'success'; // Verde
      case StatusOcorrencia.CANCELADA:
        return 'danger'; // Vermelho
      default:
        return 'secondary';
    }
  }

  getDataOcorrencia(dataString: string): string {
    const data = new Date(dataString);

    return data.toLocaleDateString('pt-BR');
  }

  atualizarSla() {
    if (!this.ocorrencias || this.ocorrencias.length === 0) return;

    this.ocorrencias.forEach((ocorrencia) => {
      if (ocorrencia.statusOcorrencia === this.StatusOcorrencia.ABERTA) {
        ocorrencia._slaFormatado = this.calcularSla(ocorrencia);
      } else if (!ocorrencia._slaFormatado) {
        ocorrencia._slaFormatado = this.calcularSla(ocorrencia);
      }
    });
  }

  private calcularSla(ocorrencia: any): { texto: string; classe: string } {
    if (ocorrencia.statusOcorrencia !== StatusOcorrencia.ABERTA && ocorrencia.slaFinal != null) {
      return this.formatarSla(ocorrencia.slaFinal);
    }

    if (!ocorrencia.limiteSLA) {
      return { texto: 'Aguardando...', classe: '' };
    }

    const limite = new Date(ocorrencia.limiteSLA).getTime();
    const agora = new Date().getTime();

    const diferencaSegundos = Math.floor((limite - agora) / 1000);

    return this.formatarSla(diferencaSegundos);
  }

  private formatarSla(slaFinal: number): { texto: string; classe: string } {
    const estourado = slaFinal < 0;
    const segundosAbs = Math.abs(slaFinal);

    const minutos = Math.floor(segundosAbs / 60);
    const segundos = segundosAbs % 60;

    const minFormatado = minutos.toString().padStart(2, '0');
    const segFormatado = segundos.toString().padStart(2, '0');

    const texto = `${estourado ? '-' : ''}${minFormatado}:${segFormatado}`;

    let classe = '';
    if (estourado) {
      classe = 'sla-estourado';
    } else if (!estourado && minutos < 2) {
      classe = 'sla-alerta';
    }

    return { texto, classe };
  }
}
