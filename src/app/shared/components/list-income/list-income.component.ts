import { Component, OnInit } from '@angular/core';
import { IncomeFlag } from '../../model/income-flag';
import { ListIncomeResponse } from '../../model/list-income-model-response';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
    selector: 'app-list-income',
    templateUrl: './list-income.component.html',
    styleUrls: ['./list-income.component.scss']
})
export class ListIncomeComponent implements OnInit {

    listIncome: ListIncomeResponse;

    constructor(
        private worklogService: WorklogApiService
    ) { }

    ngOnInit() {
        console.log(IncomeFlag.typeGetListService);
        (IncomeFlag.typeGetListService === 'corporate') ? this.getIncomeCorporate() : this.getIncomeIndividual();
    }

    getIncomeCorporate() {
        this.worklogService.getListIncomeCorporate().subscribe(response => {
            this.listIncome = response;
        });
    }

    getIncomeIndividual() {
        this.worklogService.getListIncomeIndividual().subscribe(response => {
            this.listIncome = response;
        });
    }
}
