import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProfissionaisService } from '../../services/profissionais-service/profissionais-service';
import { ProfissionalExibicaoModel } from '../../model/profissional.model';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, first, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-profissionais-component',
  imports: [TableModule],
  templateUrl: './profissionais-component.html',
  styleUrl: './profissionais-component.css',
})
export class ProfissionaisComponent implements OnInit, OnDestroy {
  private profissionaisService = inject(ProfissionaisService);
  profissionais: ProfissionalExibicaoModel[] = [];

  carregando: boolean = true;
  paginaAtual = 0;

  tamanhoPagina = 10;
  totalElementos = 0;
  campoOrdenacao?: string;
  ordemOrdenacao: number | undefined | null = -1;
  termoBusca: string = '';

  private buscaSubject = new Subject<void>();
  private buscaSubscription!: Subscription;

  ngOnInit(): void {
    this.buscaSubscription = this.buscaSubject.pipe(debounceTime(300)).subscribe(() => {
      this.paginaAtual = 0;
      this.carregarProfissionais();
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

    this.carregarProfissionais();
  }

  private carregarProfissionais() {}
}
