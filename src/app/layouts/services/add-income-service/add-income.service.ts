import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../base-api.service';
import { AddIncomeResponse } from '../../models/add-income-model';

export interface AddIncomeInterface {
    totalIncome: number;
    note: string;
}
@Injectable({
    providedIn: 'root',
})
export class AddIncomeService {
    constructor(
        private baseService: BaseApiService
    ) { }

    addIncome(data: AddIncomeInterface): Promise<AddIncomeResponse> {
        return this.baseService.callApi('incomes', 'post', data);
    }
}
