import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CotacaoDolarService {

  private apiUrl = ' https://economia.awesomeapi.com.br/json/last/USD-BRL';

  constructor(private http: HttpClient) { }
  getCotacaoDolar(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
