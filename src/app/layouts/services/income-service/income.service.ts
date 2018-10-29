import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../base-api.service';
import { AddIncomeModel } from '../../models/add-income-model';

export interface AddIncomeInterface {
    totalIncome: number;
    note: string;
}
@Injectable({
    providedIn: 'root',
})
export class IncomeService {
    constructor(
        private baseService: BaseApiService
    ) { }

    addIncome(data: AddIncomeInterface): Promise<AddIncomeModel> {
        return this.baseService.callApi('incomes/', 'post', data);
    }
}
