import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtendimentoExibicaoModel, OpcaoDespacho } from '../../model/atendimento.model';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/atendimentos';

  obterOpcoesDespacho(ocorrenciaId: number): Observable<OpcaoDespacho[]> {
    return this.http.get<OpcaoDespacho[]>(`${this.apiUrl}/opcoes-despacho/${ocorrenciaId}`);
  }

  despachar(ocorrenciaId: number, ambulanciaId: number): Observable<AtendimentoExibicaoModel> {
    return this.http.post<AtendimentoExibicaoModel>(`${this.apiUrl}/despachar`, {
      ocorrenciaId: ocorrenciaId,
      ambulanciaId: ambulanciaId,
    });
  }

  obterAtendimento(ocorrenciaId: number): Observable<AtendimentoExibicaoModel> {
    return this.http.get<AtendimentoExibicaoModel>(`${this.apiUrl}/ocorrencia/${ocorrenciaId}`);
  }
}
