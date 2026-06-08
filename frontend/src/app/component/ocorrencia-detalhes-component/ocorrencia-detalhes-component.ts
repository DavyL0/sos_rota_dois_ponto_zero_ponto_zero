import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import {
  GravidadeOcorrencia,
  GravidadeOcorrenciaLabel,
  StatusOcorrencia,
  StatusOcorrenciaLabel
} from '../../model/ocorrencias.model';
import { TipoAmbulancia, TipoAmbulanciaLabel } from '../../model/ambulancia.model';

@Component({
  selector: 'app-ocorrencia-detalhes-component',
  imports: [Tag, Button],
  templateUrl: './ocorrencia-detalhes-component.html',
  styleUrl: './ocorrencia-detalhes-component.css',
})
export class OcorrenciaDetalhesComponent implements OnInit {
  public ref = inject(DynamicDialogRef);
  public config = inject(DynamicDialogConfig);

  ocorrencia: any;

  atendimentoMock = {
    ambulanciaPlaca: 'ABC-1234',
    ambulanciaTipo: TipoAmbulancia.BASICA,
    baseAmbulancia: 'Centro',
    distanciaPercorridaKm: 12.5,
    horarioDespacho: new Date(new Date().getTime() - 45 * 60000).toISOString(),
    chegadaLocal: new Date(new Date().getTime() - 30 * 60000).toISOString(),
    horarioConclusao: new Date(new Date().getTime() - 5 * 60000).toISOString(),
  };

  protected readonly StatusOcorrencia = StatusOcorrencia;

  ngOnInit(): void {
    if (this.config.data && this.config.data.ocorrencia) {
      this.ocorrencia = { ...this.config.data.ocorrencia };
    }
  }

  fechar() {
    this.ref.close();
  }

  getGravidadeLabel(gravidade: GravidadeOcorrencia): string {
    return GravidadeOcorrenciaLabel[gravidade] || gravidade;
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
        return 'info';
    }
  }

  getStatusLabel(status: StatusOcorrencia): string {
    return StatusOcorrenciaLabel[status] || status;
  }

  getStatusSeverity(
    status: StatusOcorrencia,
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (status) {
      case StatusOcorrencia.ABERTA:
        return 'danger';
      case StatusOcorrencia.DESPACHADA:
        return 'info';
      case StatusOcorrencia.EM_ATENDIMENTO:
        return 'warn';
      case StatusOcorrencia.CONCLUIDA:
        return 'success';
      case StatusOcorrencia.CANCELADA:
        return 'secondary';
      default:
        return 'info';
    }
  }

  getAmbulanciaTipo(tipo: TipoAmbulancia) {
    return TipoAmbulanciaLabel[tipo] || tipo;
  }

  formatarDataHora(dataString: string): string {
    if (!dataString) return '--/--/---- --:--:--';
    return new Date(dataString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
