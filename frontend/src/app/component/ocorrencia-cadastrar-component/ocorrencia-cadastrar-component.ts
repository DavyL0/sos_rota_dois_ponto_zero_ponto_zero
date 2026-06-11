import { Component, inject, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OcorrenciasService } from '../../services/ocorrencias-service/ocorrencias-service';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import {
  GravidadeOcorrencia,
  OcorrenciaCadastroModel,
  OcorrenciaExibicaoModel,
} from '../../model/ocorrencias.model';
import { Bairro } from '../../model/bairro.model';
import { Textarea } from 'primeng/textarea';
import { BairroService } from '../../services/bairro-service/bairro-service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ocorrencia-cadastrar-component',
  imports: [FormsModule, InputText, NgClass, Select, Button, Textarea, Toast],
  providers: [MessageService],
  templateUrl: './ocorrencia-cadastrar-component.html',
  styleUrl: './ocorrencia-cadastrar-component.css',
})
export class OcorrenciaCadastrarComponent implements OnInit {
  private ref = inject(DynamicDialogRef);
  private ocorrenciaService = inject(OcorrenciasService);
  private bairrosService = inject(BairroService);
  private messageService = inject(MessageService);

  @Input() ocorrenciaEditando?: OcorrenciaExibicaoModel;
  idEditando: number | null = null;
  ocorrenciaOriginal: OcorrenciaCadastroModel | null = null;

  ocorrenciaCadastrada: OcorrenciaCadastroModel = {
    tipoOcorrencia: '',
    gravidadeOcorrencia: null as any,
    bairroId: null as any,
    observacao: '',
  };
  gravidades = [
    { label: 'Alta', value: GravidadeOcorrencia.ALTA },
    { label: 'Média', value: GravidadeOcorrencia.MEDIA },
    { label: 'Baixa', value: GravidadeOcorrencia.BAIXA },
  ];
  bairros: Bairro[] = [];
  erroBackend: string | null = null;
  carregandoSalvar: boolean = false;

  ngOnInit() {
    this.bairrosService.obterBairros().subscribe({
      next: (dados) => {
        this.bairros = dados;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Não foi possível carregar os bairros ',
          detail: err.error.message,
        });
      },
    });

    if (this.ocorrenciaEditando) {
      this.idEditando = this.ocorrenciaEditando.id;

      this.ocorrenciaCadastrada = {
        tipoOcorrencia: this.ocorrenciaEditando.tipoOcorrencia,
        gravidadeOcorrencia: this.ocorrenciaEditando.gravidadeOcorrencia,
        bairroId: this.ocorrenciaEditando.bairro.id,
        observacao: this.ocorrenciaEditando.observacao || '',
      };
      this.ocorrenciaOriginal = { ...this.ocorrenciaCadastrada };
    }
  }

  salvarOcorrencia() {
    this.carregandoSalvar = true;
    const requisicao = this.idEditando
      ? this.ocorrenciaService.atualizarOcorrencia(this.idEditando, this.ocorrenciaCadastrada)
      : this.ocorrenciaService.criarOcorrencia(this.ocorrenciaCadastrada);

    requisicao.subscribe({
      next: (ocorrenciaSalva) => {
        this.carregandoSalvar = false;
        this.ref.close(ocorrenciaSalva);
      },
      error: (err) => {
        this.carregandoSalvar = false;
        this.erroBackend = err.error.message;
      },
    });
  }

  fecharCadastro() {
    this.ref.close();
  }

  get semAlteracoes(): boolean {
    if (!this.idEditando || !this.ocorrenciaOriginal) return false;

    return (
      this.ocorrenciaOriginal.tipoOcorrencia === this.ocorrenciaCadastrada.tipoOcorrencia &&
      this.ocorrenciaOriginal.gravidadeOcorrencia ===
        this.ocorrenciaCadastrada.gravidadeOcorrencia &&
      this.ocorrenciaOriginal.bairroId === this.ocorrenciaCadastrada.bairroId &&
      this.ocorrenciaOriginal.observacao === this.ocorrenciaCadastrada.observacao
    );
  }
}
