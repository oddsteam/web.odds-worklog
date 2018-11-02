import { Component, OnInit } from '@angular/core';
import { ListIncomeResponse } from '../../model/list-income-model-response';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
    selector: 'app-list-income',
    templateUrl: './list-income.component.html',
    styleUrls: ['./list-income.component.scss'],
})
export class ListIncomeComponent implements OnInit {
    date = new Date();
    listIncome: ListIncomeResponse;
    constructor(private worklogApiService: WorklogApiService) { }

    ngOnInit() {
        if ('Corporate') {
            this.isCorporate();
        }
    }

    private isCorporate() {
        this.worklogApiService.getListIncomeCorporate().subscribe(res => {
            this.listIncome = res;
        });
    }

    private isIndividual() { }
}
