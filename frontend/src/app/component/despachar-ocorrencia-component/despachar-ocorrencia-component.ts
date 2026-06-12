import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AtendimentoService } from '../../services/atendimento-service/atendimento-service';
import { OpcaoDespacho } from '../../model/atendimento.model';
import { OcorrenciaExibicaoModel } from '../../model/ocorrencias.model';
import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-despachar-ocorrencia-component',
  imports: [Tag, TableModule, Button],
  templateUrl: './despachar-ocorrencia-component.html',
  styleUrl: './despachar-ocorrencia-component.css',
})
export class DespacharOcorrenciaComponent implements OnInit {
  private atendimentoService = inject(AtendimentoService);
  private ref = inject(DynamicDialogRef);
  private cd = inject(ChangeDetectorRef);

  @Input() ocorrenciaDespacho: OcorrenciaExibicaoModel | null = null;
  ocorrenciaId: number | null = null;

  opcoesDespacho: OpcaoDespacho[] = [];
  carregandoLista: boolean = false;

  opcaoSelecionada: OpcaoDespacho | null = null;
  carregandoDespacho: boolean = false;
  minutosSlaRestante: number = 0;

  ngOnInit() {
    if (this.ocorrenciaDespacho) {
      this.ocorrenciaId = this.ocorrenciaDespacho.id;
      this.carregandoLista = true;
      this.atendimentoService.obterOpcoesDespacho(this.ocorrenciaId).subscribe({
        next: (dados) => {
          this.opcoesDespacho = dados;
          this.carregandoLista = false;
          this.cd.detectChanges();
        },
        error: (err) => {},
      });

      console.log(this.ocorrenciaDespacho.limiteSLA)
      const limite = new Date(this.ocorrenciaDespacho.limiteSLA).getTime();
      const agora = new Date().getTime();
      this.minutosSlaRestante = Math.floor((limite - agora) / 60000);
    }
  }

  confirmarDespacho() {
    if (!this.opcaoSelecionada || !this.ocorrenciaId) {
      return;
    }

    this.carregandoDespacho = true;

    this.atendimentoService
      .despachar(this.ocorrenciaId, this.opcaoSelecionada.ambulancia.id)
      .subscribe({
        next: (resultado) => {
          this.carregandoDespacho = false;
          this.ref.close(resultado);
        },
        error: (err) => {
          this.carregandoDespacho = false;
          //todo tratar possiveis erros
        },
      });
  }

  fechar() {
    this.ref.close();
  }
}
