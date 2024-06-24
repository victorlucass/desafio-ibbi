import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  descricao: string;
}

export interface CategoriaPOST {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:8000/v1/categorias';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  getCategoriaForId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  inputCategoria(categoria: CategoriaPOST): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoria);
  }
}
