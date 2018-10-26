import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../base-api.service';

@Injectable({
    providedIn: 'root',
})
export class IncomeService {
    constructor(
        private http: HttpClient,
        private baseService: BaseApiService
    ) { }

    addIncome(stock: string): any {
        return this.http.post(`${environment.api}/incomes/${stock}`, stock);
    }

    addIncomes(): Promise<any> {
        return this.baseService.callApi('v1/incomes/', 'post');
    }
}
