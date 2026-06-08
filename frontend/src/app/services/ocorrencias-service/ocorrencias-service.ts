import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../model/page.model';
import { OcorrenciaCadastroModel, OcorrenciaExibicaoModel } from '../../model/ocorrencias.model';

@Injectable({
  providedIn: 'root',
})
export class OcorrenciasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/ocorrencias';

  obterOcorrencias(
    page: number,
    size: number,
    sortField?: string,
    sortOrder?: number,
  ): Observable<Page<OcorrenciaExibicaoModel>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (sortField) {
      const direction = sortOrder === 1 ? 'asc' : 'desc';
      params = params.set('sort', `${sortField},${direction}`);
    }

    return this.http.get<Page<OcorrenciaExibicaoModel>>(`${this.apiUrl}`, { params });
  }

  criarOcorrencia(ocorrencia: OcorrenciaCadastroModel): Observable<OcorrenciaExibicaoModel> {
    return this.http.post<OcorrenciaExibicaoModel>(`${this.apiUrl}`, ocorrencia);
  }
}
