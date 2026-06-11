import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../model/page.model';
import { EquipeCadastroModel, EquipeExibicaoModel } from '../../model/equipes.model';

@Injectable({
  providedIn: 'root',
})
export class EquipesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/equipes';

  obterEquipes(
    page: number,
    size: number,
    filtro?: string,
    ativo?: null | boolean,
    tipo?: null | string,
  ): Observable<Page<EquipeExibicaoModel>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (filtro) {
      params = params.set('filtro', filtro);
    }

    if (ativo !== undefined && ativo !== null) {
      params = params.set('ativo', ativo);
    }

    if (tipo) {
      params = params.set('tipo', tipo);
    }

    return this.http.get<Page<EquipeExibicaoModel>>(`${this.apiUrl}`, { params });
  }

  salvarEquipe(equipe: EquipeCadastroModel): Observable<EquipeExibicaoModel> {
    return this.http.post<EquipeExibicaoModel>(`${this.apiUrl}`, equipe);
  }

  atualizarEquipe(id: number, equipe: EquipeCadastroModel): Observable<EquipeExibicaoModel> {
    return this.http.put<EquipeExibicaoModel>(`${this.apiUrl}/${id}`, equipe);
  }

  alterarStatusEquipe(id: number, ativo: boolean): Observable<EquipeExibicaoModel> {
    return this.http.patch<EquipeExibicaoModel>(`${this.apiUrl}/${id}/status`,  ativo );
  }
}
