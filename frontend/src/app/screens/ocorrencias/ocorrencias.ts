import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { Tooltip } from 'primeng/tooltip';
import { NgClass } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OcorrenciaDetalhesComponent } from '../../component/ocorrencia-detalhes-component/ocorrencia-detalhes-component';

@Component({
  selector: 'app-ocorrencias',
  imports: [Button, TableModule, Skeleton, Tooltip, NgClass],
  providers: [DialogService],
  templateUrl: './ocorrencias.html',
  styleUrl: './ocorrencias.css',
})
export class Ocorrencias extends TabelaOrdenacao implements OnInit, OnDestroy {
  private ocorrenciasService = inject(OcorrenciasService);
  private cd = inject(ChangeDetectorRef);
  ref: DynamicDialogRef | undefined | null;

  constructor(public dialogService: DialogService) {
    super();
  }

  ocorrencias: OcorrenciaExibicaoModel[] = [];

  totalElementos = 0;

  protected readonly StatusOcorrencia = StatusOcorrencia;
  gravidadeLabel = GravidadeOcorrenciaLabel;
  statusLabel = StatusOcorrenciaLabel;

  private timerSubscription!: Subscription;

  ngOnInit() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.atualizarSla();
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

  abrirDetalhes(ocorrencia: OcorrenciaExibicaoModel) {
    this.ref = this.dialogService.open(OcorrenciaDetalhesComponent, {
      header: `Histórico da ocorrência #${ocorrencia.id}`,
      width: '60vw',
      modal: true,
      closable: true,
      data: { ocorrencia },
    });
  }

  getGravidadeLabel(gravidade: GravidadeOcorrencia): string {
    return this.gravidadeLabel[gravidade] || gravidade;
  }

  getStatusLabel(status: StatusOcorrencia): string {
    return this.statusLabel[status] || status;
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
