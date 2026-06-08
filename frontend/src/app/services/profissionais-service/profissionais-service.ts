import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfissionalExibicaoModel } from '../../model/profissional.model';

@Injectable({
  providedIn: 'root',
})
export class ProfissionaisService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/profissionais';

  obterProfissionais(): Observable<ProfissionalExibicaoModel> {
    return this.http.get<ProfissionalExibicaoModel>(`${this.apiUrl}`);
  }
}
