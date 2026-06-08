import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ocorrencias',
  imports: [Button, TableModule, Skeleton, Tooltip, JsonPipe],
  templateUrl: './ocorrencias.html',
  styleUrl: './ocorrencias.css',
})
export class Ocorrencias extends TabelaOrdenacao {
  private ocorrenciasService = inject(OcorrenciasService);
  private cd = inject(ChangeDetectorRef);

  ocorrencias: OcorrenciaExibicaoModel[] = [];

  totalElementos = 0;

  protected readonly StatusOcorrencia = StatusOcorrencia;
  gravidadeLabel = GravidadeOcorrenciaLabel;
  statusLabel = StatusOcorrenciaLabel;

  protected override carregarDados(): void {
    this.carregando = true;
    this.ocorrenciasService.obterOcorrencias().subscribe({
      next: (dados) => {
        this.ocorrencias = dados.content;
        this.totalElementos = dados.page.totalElements;
        this.carregando = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.log('Erro ao carregar ocorrências:', err);
        this.carregando = false;
        this.cd.markForCheck();
      },
    });
  }

  getGravidadeLabel(gravidade: GravidadeOcorrencia): string {
    return this.gravidadeLabel[gravidade] || gravidade;
  }

  getStatusLabel(status: StatusOcorrencia): string {
    console.log(status);
    return this.statusLabel[status] || status;
  }

  getDataOcorrencia(dataString: string): string {
    const data = new Date(dataString);

    return data.toLocaleDateString('pt-BR');
  }
}
