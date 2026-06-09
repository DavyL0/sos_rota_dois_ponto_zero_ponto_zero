import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bairro } from '../../model/bairro.model';

@Injectable({
  providedIn: 'root',
})
export class BairroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/bairros';

  obterBairros(): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(`${this.apiUrl}`);
  }
}
