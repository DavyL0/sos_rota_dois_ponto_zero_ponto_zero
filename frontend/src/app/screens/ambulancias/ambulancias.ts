import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AmbulanciasService } from '../../services/ambulancias-service/ambulancias-service';
import {
  AmbulanciaExibicaoModel,
  StatusAmbulancia,
  StatusAmbulanciaLabel,
  TipoAmbulancia,
  TipoAmbulanciaLabel
} from '../../model/ambulancia.model';
import { Button } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-ambulancias',
  imports: [Button, TableModule, Tag, Tooltip, Skeleton],
  templateUrl: './ambulancias.html',
  styleUrl: './ambulancias.css',
})
export class Ambulancias {
  private service = inject(AmbulanciasService);
  private cd = inject(ChangeDetectorRef);

  ambulancias: AmbulanciaExibicaoModel[] = [];
  carregando: boolean = true;

  paginaAtual = 0;
  tamanhoPagina = 10;
  totalElementos = 0;
  campoOrdenacao?: string;
  ordemOrdenacao: number | undefined | null = -1;
  statusLabel = StatusAmbulanciaLabel;
  tipoLabel = TipoAmbulanciaLabel;

  carregarTabela(event: TableLazyLoadEvent) {
    this.carregando = true;

    const first = event.first ?? 0;
    const rows = event.rows ?? this.tamanhoPagina;
    this.paginaAtual = Math.floor(first / rows);
    this.tamanhoPagina = rows;

    this.campoOrdenacao = event.sortField as string;
    this.ordemOrdenacao = event.sortOrder;

    this.carregarAmbulancias();
  }

  carregarAmbulancias() {
    this.carregando = true;
    this.service
      .obterAmbulancias(
        this.paginaAtual,
        this.tamanhoPagina,
        this.campoOrdenacao,
        this.ordemOrdenacao ?? -1,
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

  getSeverityStatus(
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

  getSeverityTipo(tipo: TipoAmbulancia): 'danger' | 'info' {
    return tipo === TipoAmbulancia.UTI ? 'danger' : 'info';
  }

  getTipoLabel(tipo: any): string {
    return this.tipoLabel[tipo as TipoAmbulancia] || tipo;
  }

  getStatusLabel(status: any): string {
    return this.statusLabel[status as StatusAmbulancia] || status;
  }
}
