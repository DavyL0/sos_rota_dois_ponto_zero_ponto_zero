import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OcorrenciasService } from '../../services/ocorrencias-service/ocorrencias-service';

@Component({
  selector: 'app-ocorrencia-cadastrar-component',
  imports: [],
  templateUrl: './ocorrencia-cadastrar-component.html',
  styleUrl: './ocorrencia-cadastrar-component.css',
})
export class OcorrenciaCadastrarComponent {
  public ref = inject(DynamicDialogRef);
  public config = inject(DynamicDialogConfig);
  private service = inject(OcorrenciasService);
}
