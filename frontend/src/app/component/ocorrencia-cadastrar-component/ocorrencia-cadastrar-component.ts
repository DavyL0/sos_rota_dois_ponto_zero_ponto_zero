import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OcorrenciasService } from '../../services/ocorrencias-service/ocorrencias-service';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { GravidadeOcorrencia, OcorrenciaCadastroModel } from '../../model/ocorrencias.model';
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

  ngOnInit() {
    this.bairrosService.obterBairros().subscribe({
      next: (dados) => {
        this.bairros = dados;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Não foi possível carregar os bairros ', detail: err.error.message });
      },
    });
  }

  salvarOcorrencia() {
    this.ocorrenciaService.criarOcorrencia(this.ocorrenciaCadastrada).subscribe({
      next: (ocorrenciaCriada) => {
        this.ref.close(ocorrenciaCriada);
      },
      error: (err) => {
        this.erroBackend = err.error.message;
      },
    });
  }

  fecharCadastro() {
    this.ref.close();
  }
}
