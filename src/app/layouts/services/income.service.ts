import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  addIncome(stock: string): any {
    return this.http.post(`${environment.api}/incomes/${stock}`, stock);
  }
}
