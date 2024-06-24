import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ProductPOST = {
  descricao: string;
  valor: number;
  quantidade: number;
  categoria_id: number;
  imagem: string;
};

export type ProductPUT = {
  id?: number;
  descricao: string;
  valor: number;
  quantidade: number;
  categoria_id: number;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = 'http://localhost:8000/v1/produtos/';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  insertProduto(produto: ProductPOST): Observable<any> {
    return this.http.post<any>(this.apiUrl, produto);
  }

  deleteProduto(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + id);
  }

  updateProduto(produto: ProductPUT): Observable<any> {
    return this.http.put<any>(this.apiUrl, produto);
  }

}
