import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AmbulanciasService } from '../../services/ambulancias-service/ambulancias-service';
import {
  AmbulanciaExibicaoModel,
  StatusAmbulancia,
  StatusAmbulanciaLabel,
  TipoAmbulancia,
  TipoAmbulanciaLabel
} from '../../model/ambulancia.model';
import { Button } from 'primeng/button';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { Skeleton } from 'primeng/skeleton';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, Subscription } from 'rxjs';

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
  ],
  templateUrl: './ambulancias.html',
  styleUrl: './ambulancias.css',
})
export class Ambulancias implements OnInit, OnDestroy {
  private service = inject(AmbulanciasService);
  private cd = inject(ChangeDetectorRef);

  ambulancias: AmbulanciaExibicaoModel[] = [];
  carregando: boolean = true;

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

  getTipoLabel(tipo: any): string {
    return this.tipoLabel[tipo as TipoAmbulancia] || tipo;
  }

  getStatusLabel(status: any): string {
    return this.statusLabel[status as StatusAmbulancia] || status;
  }

  protected filtrarTabela() {
    this.buscaSubject.next();
  }

  protected limparOrdenacao(tabela: Table) {
    tabela.sortField = null;
    tabela.sortOrder = 1;
    tabela.reset();
  }

  protected limparBusca() {
    this.termoBusca = '';
    this.filtrarTabela();
  }
}
