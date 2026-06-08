import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-ocorrencia-cadastrar-component',
  imports: [FormsModule, InputText, NgClass, Select, Button, Textarea],
  templateUrl: './ocorrencia-cadastrar-component.html',
  styleUrl: './ocorrencia-cadastrar-component.css',
})
export class OcorrenciaCadastrarComponent {
  public ref = inject(DynamicDialogRef);
  private service = inject(OcorrenciasService);

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
  bairros: Bairro[] = [
    //todo receber os bairros do backend
    { id: 2, nome: 'Centro' },
  ];
  erroBackend: string | null = null;

  salvarOcorrencia() {
    this.service.criarOcorrencia(this.ocorrenciaCadastrada).subscribe({
      next: () => {
        this.ref.close(true);
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
