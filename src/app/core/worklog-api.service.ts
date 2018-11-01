import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListIncomeResponse } from '../shared/model/list-income-model-response';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})
export class WorklogApiService {

  constructor(
    private http: HttpClient
  ) { }


  getLogin(): Observable<any> {
    return this.http.post<any>(`${environment.api}login`, { 'id': '5bd72d2a64b21800011be01f' });
  }

  getListIncomeCorporate(): Observable<ListIncomeResponse> {
    return this.http.get<ListIncomeResponse>(`${environment.api}incomes/status`, httpOptions);
  }

}
