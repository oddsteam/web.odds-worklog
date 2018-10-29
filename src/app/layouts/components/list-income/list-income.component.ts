import { Component, OnInit } from '@angular/core';
import { GetIncomeService } from '../../services/get-income-service/get-income.service';
import { ListIncome } from '../../models/list-income';

@Component({
    selector: 'app-list-income',
    templateUrl: './list-income.component.html',
    styleUrls: ['./list-income.component.scss'],
})
export class ListIncomeComponent implements OnInit {
    date = new Date();
    listIncome: ListIncome[];
    constructor(
        private getIncomeService: GetIncomeService
    ) { }

    ngOnInit() {
        this.mock();
        this.getIncomeService.getIncomeStatus().then(res => {
            console.log(res);
        });
    }

    private mock() {
        this.listIncome = [
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'Y',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'Y',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'N',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'Y',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'N',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'Y',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'Y',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'N',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'N',
            },
            {
                fullnameTH: 'กฤษดา คำทะมูล',
                fullnameEN: 'kitsada khamthamun',
                email: 'kitsada@odds.team',
                bankAccountName: 'กฤษดา คำทะมูล',
                bankAccountNumber: 1234567890,
                submitDate: new Date(),
                status: 'Y',
            },
        ];
    }
}
