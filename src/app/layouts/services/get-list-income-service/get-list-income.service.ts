import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { ListIncomeResponse } from '../../models/list-income.model';

@Injectable({
    providedIn: 'root'
})
export class GetListIncomeService {

    constructor(
        private baseService: BaseApiService
    ) { }

    getListIncomeStatus(): Promise<ListIncomeResponse> {
        return this.baseService.callApi('incomes/status', 'get');
    }
}
