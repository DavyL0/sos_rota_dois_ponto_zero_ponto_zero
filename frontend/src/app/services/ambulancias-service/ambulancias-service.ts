import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AmbulanciaCadastroModel, AmbulanciaExibicaoModel } from '../../model/ambulancia.model';
import { Page } from '../../model/page.model';

@Injectable({
  providedIn: 'root',
})
export class AmbulanciasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/ambulancias';

  obterAmbulancias(
    page: number,
    size: number,
    sortField?: string,
    sortOrder?: number,
    filtro?: string,
  ): Observable<Page<AmbulanciaExibicaoModel>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (sortField) {
      if (sortField === 'bairro.nome') {
        sortField = 'bairroBase';
      }
      if (sortField === 'tipo') {
        sortField = 'tipoAmbulancia';
      }
      const direction = sortOrder === 1 ? 'asc' : 'desc';
      params = params.set('sort', `${sortField},${direction}`);
    }

    if (filtro) {
      params = params.set('filtro', filtro);
    }

    return this.http.get<Page<AmbulanciaExibicaoModel>>(`${this.apiUrl}`, { params });
  }

  obterAmbulanciasDisponiveis(equipeId?: number): Observable<AmbulanciaExibicaoModel[]> {
    let params = new HttpParams();
    if (equipeId) params = params.set('equipeId', equipeId);
    return this.http.get<AmbulanciaExibicaoModel[]>(`${this.apiUrl}/disponiveis`, { params });
  }

  criarAmbulancia(ambulancia: AmbulanciaCadastroModel): Observable<AmbulanciaExibicaoModel> {
    return this.http.post<AmbulanciaExibicaoModel>(`${this.apiUrl}`, ambulancia);
  }

  atualizarAmbulancia(
    id: number,
    ambulancia: AmbulanciaCadastroModel,
  ): Observable<AmbulanciaExibicaoModel> {
    return this.http.put<AmbulanciaExibicaoModel>(`${this.apiUrl}/${id}`, ambulancia);
  }

  apagarAmbulancia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
