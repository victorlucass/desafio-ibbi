import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type UserLogin = {
  usuario: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/v1/usuarios/login';

  constructor(private http: HttpClient) { }

  handleLogin(userLogin: UserLogin): Observable<any> {
    return this.http.post<any>(this.apiUrl, userLogin);
  }
}
