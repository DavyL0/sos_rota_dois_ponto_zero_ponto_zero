import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AtendimentoService } from '../../services/atendimento-service/atendimento-service';
import { OpcaoDespacho } from '../../model/atendimento.model';
import {
  GravidadeOcorrencia,
  GravidadeOcorrenciaLabel,
  OcorrenciaExibicaoModel,
} from '../../model/ocorrencias.model';
import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-despachar-ocorrencia-component',
  imports: [Tag, TableModule, Button, NgClass],
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
  erroBackend: string | null = null;

  protected readonly Math = Math;

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
        error: (err) => {
          console.log('Erro ao obter opções de despacho', err);
          this.carregandoLista = false;
        },
      });

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
    this.erroBackend = null;

    this.atendimentoService
      .despachar(this.ocorrenciaId, this.opcaoSelecionada.ambulancia.id)
      .subscribe({
        next: (resultado) => {
          this.carregandoDespacho = false;
          this.ref.close(resultado);
        },
        error: (err: HttpErrorResponse) => {
          this.carregandoDespacho = false;
          console.log('Erro ao despachar', err)

          if (err.status === 400) {
            this.erroBackend = err.error.message;
          }
        },
      });
  }

  fechar() {
    this.ref.close();
  }

  getGravidadeOcorrencia(gravidade: any) {
    return GravidadeOcorrenciaLabel[gravidade as GravidadeOcorrencia] || gravidade;
  }

  getSlaRestanteClass() {
    if (this.minutosSlaRestante <= 0) {
      return 'sla-estourado overview-valor';
    } else if (this.minutosSlaRestante <= 2) {
      return 'sla-alerta overview-valor';
    } else {
      return 'overview-valor';
    }
  }
}
