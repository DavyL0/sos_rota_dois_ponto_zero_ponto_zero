import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ProfissionalCadastroModel,
  ProfissionalExibicaoModel,
} from '../../model/profissional.model';
import { Page } from '../../model/page.model';

@Injectable({
  providedIn: 'root',
})
export class ProfissionaisService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/profissionais';

  obterProfissionais(
    page: number,
    size: number,
    sortField?: string,
    sortOrder?: number,
    filtro?: string,
  ): Observable<Page<ProfissionalExibicaoModel>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (sortField) {
      const direction = sortOrder === 1 ? 'asc' : 'desc';
      params = params.set('sort', `${sortField},${direction}`);
    }

    if (filtro) {
      params = params.set('filtro', filtro);
    }

    return this.http.get<Page<ProfissionalExibicaoModel>>(`${this.apiUrl}`, { params });
  }

  criarProfissional(
    profissional: ProfissionalCadastroModel,
  ): Observable<ProfissionalExibicaoModel> {
    return this.http.post<ProfissionalExibicaoModel>(`${this.apiUrl}`, { profissional });
  }
}
