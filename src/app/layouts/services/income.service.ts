import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ListIncomeResponse } from '../models/list-income-model-response';
import { AddIncomeResponse } from '../models/add-income-model-response';
import { AddIncome } from '../models/add-income-model';
import { IncomeFlag } from '../models/income-flag';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IncomeService {
    constructor(private baseService: BaseApiService) { }

    getListIncomeStatus(): Observable<ListIncomeResponse> {
        return this.baseService.callApi('incomes/status', 'get');
    }

    addIncomeConfirm(data: AddIncome): Observable<AddIncomeResponse> {
        return this.baseService.callApi('incomes', 'post', data);
    }

    updateIncomeService(data: AddIncome): Observable<AddIncomeResponse> {
        return this.baseService.callApi(`incomes/${IncomeFlag.id}`, 'put', data);
    }

    // เช็คว่า add-income ไปรึยัง
    getIncomeByUserID(id: string = '5bd72d2a64b21800011be01f'): Observable<AddIncomeResponse> {
        return this.baseService.callApi(`/incomes/month/${id}`, 'get');
    }
}
