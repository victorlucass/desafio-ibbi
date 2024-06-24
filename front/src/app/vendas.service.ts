import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type VendaPOST = {
  produto_id?: number,
  usuario_id?: number,
  quantidade?: number,
  data_venda?: string
}

export type VendaPUT = {
  id?: number,
  produto_id?: number,
  usuario_id?: number,
  quantidade?: number,
  data_venda?: string
}


@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private apiUrl = 'http://localhost:8000/v1/vendas/';

  constructor(private http: HttpClient) {}

  insertVenda(venda: VendaPOST): Observable<any> {
    return this.http.post<any>(this.apiUrl, venda);
  }

  getVendas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteVenda(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + id);
  }

  updateVenda(venda: VendaPOST): Observable<any> {
    return this.http.put<any>(this.apiUrl, venda);
  }
}
