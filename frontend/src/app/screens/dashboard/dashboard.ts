import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';
import { DashboardDados } from '../../model/dashboard.model';
import { OcorrenciasService } from '../../services/ocorrencias-service/ocorrencias-service';
import {
  GravidadeOcorrencia,
  GravidadeOcorrenciaLabel,
  OcorrenciaExibicaoModel,
  StatusOcorrencia,
  StatusOcorrenciaLabel
} from '../../model/ocorrencias.model';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { NgClass } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  OcorrenciaDetalhesComponent
} from '../../component/ocorrencia-detalhes-component/ocorrencia-detalhes-component';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule, Skeleton, Button, Tag, NgClass, Tooltip],
  providers: [DialogService, DynamicDialogRef],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);
  private ocorrenciasService = inject(OcorrenciasService);
  private cd = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private ref: DynamicDialogRef | null = inject(DynamicDialogRef);
  private dialogService = inject(DialogService);
  private timerSubscription!: Subscription;

  dashboard: DashboardDados | null = null;

  ocorrencias: OcorrenciaExibicaoModel[] = [];

  carregandoOcorrencias: boolean = false;
  protected readonly StatusOcorrencia = StatusOcorrencia;
  gravidadeLabel = GravidadeOcorrenciaLabel;
  statusLabel = StatusOcorrenciaLabel;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.timerSubscription = interval(1000).subscribe(() => {
        this.atualizarSla();
        this.cd.detectChanges();
      });
    });

    this.dashboardService.carregarDashboard().subscribe({
      next: (dashboard) => {
        console.log(dashboard);
        this.dashboard = dashboard;
        this.cd.markForCheck();
      },
      error: (error) => {
        console.error('Erro ao carregar dashboard:', error);
      },
    });

    this.carregandoOcorrencias = true;
    this.ocorrenciasService.obterOcorrencias(0, 5).subscribe({
      next: (dados) => {
        this.ocorrencias = dados.content;
        this.carregandoOcorrencias = false;
        this.cd.markForCheck();
      },
      error: (error) => {
        console.log('Erro ao carregar ocorrências:', error);
        this.carregandoOcorrencias = false;
        this.cd.markForCheck();
      },
    });
  }

  protected cancelarOcorrencia(ocorrencia: OcorrenciaExibicaoModel) {
    // this.ref = this.dialogService.open(OcorrenciaCancelarComponent, {
    //   header: 'Cancelar Ocorrência',
    //   width: '60vw',
    //   modal: true,
    //   closable: true,
    //   inputValues: {
    //     idEditando: ocorrencia.id,
    //   },
    // });
    //
    // this.ref?.onClose.subscribe((ocorrencia: OcorrenciaExibicaoModel | null) => {
    //   if (ocorrencia) {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Sucesso',
    //       detail: 'Ocorrência atualizada com sucesso',
    //     });
    //     this.carregarDados();
    //   }
    // });
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

  abrirDespachar(ocorrencia: OcorrenciaExibicaoModel) {
    // this.ref = this.dialogService.open(DespacharOcorrenciaComponent, {
    //   header: 'Despachar ambulância',
    //   width: '60vw',
    //   modal: true,
    //   closable: true,
    //   inputValues: {
    //     ocorrenciaDespacho: ocorrencia,
    //   },
    // });
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
        return 'info';
      case StatusOcorrencia.DESPACHADA:
        return 'warn';
      case StatusOcorrencia.EM_ATENDIMENTO:
        return 'warn';
      case StatusOcorrencia.CONCLUIDA:
        return 'success';
      case StatusOcorrencia.CANCELADA:
        return 'danger';
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
