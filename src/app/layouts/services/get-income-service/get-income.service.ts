import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { GetIncomeResponse } from '../../models/get-income.model';

@Injectable({
    providedIn: 'root'
})
export class GetIncomeService {

    constructor(
        private baseService: BaseApiService
    ) { }

    getIncomeStatus(): Promise<GetIncomeResponse> {
        return this.baseService.callApi('incomes/status', 'get');
    }
}
