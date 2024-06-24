import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8000/v1/dashboard/';

  constructor(private http: HttpClient) {}

  getHistoricoVendas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getVendasPorCategoria(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getMaisVendidos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
