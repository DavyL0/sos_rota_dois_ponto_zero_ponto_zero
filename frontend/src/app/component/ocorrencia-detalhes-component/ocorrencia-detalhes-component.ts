import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import {
  GravidadeOcorrencia,
  GravidadeOcorrenciaLabel,
  OcorrenciaExibicaoModel,
  StatusOcorrencia,
  StatusOcorrenciaLabel,
} from '../../model/ocorrencias.model';
import { TipoAmbulancia, TipoAmbulanciaLabel } from '../../model/ambulancia.model';
import { AtendimentoService } from '../../services/atendimento-service/atendimento-service';
import { AtendimentoExibicaoModel } from '../../model/atendimento.model';

@Component({
  selector: 'app-ocorrencia-detalhes-component',
  imports: [Tag, Button],
  templateUrl: './ocorrencia-detalhes-component.html',
  styleUrl: './ocorrencia-detalhes-component.css',
})
export class OcorrenciaDetalhesComponent implements OnInit {
  private atendimentoService = inject(AtendimentoService);
  public ref = inject(DynamicDialogRef);
  private cd = inject(ChangeDetectorRef);

  @Input() ocorrencia!: OcorrenciaExibicaoModel;

  atendimento: AtendimentoExibicaoModel | null = null;
  carregandoAtendimento: boolean = false;

  protected readonly StatusOcorrencia = StatusOcorrencia;
  protected readonly Math = Math;

  ngOnInit(): void {
    if (
      this.ocorrencia.statusOcorrencia === StatusOcorrencia.DESPACHADA ||
      this.ocorrencia.statusOcorrencia === StatusOcorrencia.EM_ATENDIMENTO ||
      this.ocorrencia.statusOcorrencia === StatusOcorrencia.CONCLUIDA
    ) {
      this.carregandoAtendimento = true;
      this.atendimentoService.obterAtendimento(this.ocorrencia.id).subscribe({
        next: (atendimento) => {
          this.atendimento = atendimento;
          this.carregandoAtendimento = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log('Erro ao obter atendimento', err);
          this.carregandoAtendimento = false;
          this.cd.detectChanges();
        },
      });
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

  getAmbulanciaTipo(tipo: any) {
    if (!tipo) return '';
    return TipoAmbulanciaLabel[tipo as TipoAmbulancia] || tipo;
  }

  formatarDataHora(dataString: string | null | undefined): string {
    if (!dataString) return '--/--/---- --:--:--';

    const dataNormalizada = dataString.replace('Z', '');

    return new Date(dataNormalizada).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
