import { Component, Input, inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OcorrenciasService } from '../../services/ocorrencias-service/ocorrencias-service';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-ocorrencia-cancelar-component',
  standalone: true,
  imports: [FormsModule, Button, NgClass, Textarea],
  templateUrl: './ocorrencia-cancelar-component.html',
  styleUrl: './ocorrencia-cancelar-component.css',
})
export class OcorrenciaCancelarComponent {
  private ref = inject(DynamicDialogRef);
  private ocorrenciasService = inject(OcorrenciasService);

  @Input() idEditando!: number;

  justificativa: string = '';
  erroBackend: string | null = null;
  carregando: boolean = false;

  confirmarCancelamento() {
    if (!this.justificativa || !this.justificativa.trim()) {
      return;
    }

    this.carregando = true;
    this.erroBackend = null;

    this.ocorrenciasService.cancelarOcorrencia(this.idEditando, this.justificativa).subscribe({
      next: (ocorrenciaCancelada) => {
        this.carregando = false;
        this.ref.close(ocorrenciaCancelada);
      },
      error: (err) => {
        console.log('Erro ao cancelar', err)
        this.carregando = false;
        this.erroBackend = err.error?.message || 'Erro ao cancelar a ocorrência. Tente novamente.';
      },
    });
  }

  fechar() {
    this.ref.close();
  }
}
