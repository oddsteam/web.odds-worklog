import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ListIncomeResponse } from '../models/list-income-model-response';
import { AddIncomeResponse } from '../models/add-income-model-response';
import { AddIncome } from '../models/add-income-model';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private baseService: BaseApiService) {}

  getListIncomeStatus(): Promise<ListIncomeResponse> {
    return this.baseService.callApi('incomes/status', 'get');
  }

    addIncomeConfirm(data: AddIncome): Promise<AddIncomeResponse> {
        return this.baseService.callApi('incomes', 'post', data);
    }

    getIncomeByUserID(id: string = '5bd72d2a64b21800011be01f'): Promise<any> {
        return this.baseService.callApi(`/incomes/month/${id}`, 'get');
    }
}
