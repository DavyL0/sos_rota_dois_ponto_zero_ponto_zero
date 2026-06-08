import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OcorrenciasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/ocorrencias';


}
