import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardDados } from '../../model/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/dashboard';

  carregarDashboard():Observable<DashboardDados> {
    return this.http.get<DashboardDados>(`${this.apiUrl}`);
  }
}
