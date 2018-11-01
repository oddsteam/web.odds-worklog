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
        return this.baseService._get('incomes/status');
    }

    addIncomeConfirm(data: AddIncome): Observable<AddIncomeResponse> {
        return this.baseService._post('incomes', data);
    }

    updateIncomeService(data: AddIncome): Observable<AddIncomeResponse> {
        return this.baseService._put(`incomes/${IncomeFlag.id}`, data);
    }

    // เช็คว่า add-income ไปรึยัง
    getIncomeByUserID(id: string = '5bd72d2a64b21800011be01f'): Observable<AddIncomeResponse> {
        return this.baseService._get(`/incomes/month/${id}`);
    }
}
