import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../model/page.model';
import { OcorrenciaExibicaoModel } from '../../model/ocorrencias.model';

@Injectable({
  providedIn: 'root',
})
export class OcorrenciasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/ocorrencias';

  obterOcorrencias(): Observable<Page<OcorrenciaExibicaoModel>> {
    return this.http.get<Page<OcorrenciaExibicaoModel>>(`${this.apiUrl}`);
  }
}
