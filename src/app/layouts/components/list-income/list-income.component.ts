import { Component, OnInit } from '@angular/core';
import { ListIncome } from '../../models/list-income';
import { GetListIncomeService } from '../../services/get-list-income-service/get-list-income.service';
import { ListIncomeResponse } from '../../models/list-income.model';

@Component({
    selector: 'app-list-income',
    templateUrl: './list-income.component.html',
    styleUrls: ['./list-income.component.scss'],
})
export class ListIncomeComponent implements OnInit {
    date = new Date();
    listIncome: ListIncomeResponse[];
    constructor(
        private getListIncomeService: GetListIncomeService
    ) { }

    ngOnInit() {
        this.getListIncomeService.getListIncomeStatus().then(res => {
            this.listIncome = this.toArray(res);
        });
    }

    private toArray(data): any[] {
        if (data) {
            if (data instanceof Object && data instanceof Array) {
                return data;
            }
            return [data];
        }
        return [];
    }
}
