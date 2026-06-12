//padrao de projeto: template method
import { TableLazyLoadEvent } from 'primeng/table';

export abstract class TabelaOrdenacao {
  carregando: boolean = true;
  paginaAtual = 0;
  tamanhoPagina = 10;
  campoOrdenacao?: string;
  ordemOrdenacao: number | undefined | null = -1;

  protected carregarTabela(event: TableLazyLoadEvent) {
    this.carregando = true;

    const first = event.first ?? 0;
    const rows = event.rows ?? this.tamanhoPagina;
    this.paginaAtual = Math.floor(first / rows);
    this.tamanhoPagina = rows;

    this.campoOrdenacao = event.sortField as string;
    this.ordemOrdenacao = event.sortOrder;

    this.carregarDados();
  }

  protected abstract carregarDados(): void;
}
