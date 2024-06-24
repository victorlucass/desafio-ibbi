import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type User = {
  id: number;
  usuario: string;
}

export type UserPUT = {
  id?: number;
  usuario: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private apiUrl = 'http://localhost:8000/v1/usuarios/';

  constructor(private http: HttpClient) { }
  getUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + id);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + id);
  }

  editUser(user: UserPUT): Observable<any> {
    return this.http.put<any>(this.apiUrl, user);
  }
}
