import { Component, OnInit, Input } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { IncomeFlag } from '../../model/income-flag';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
    @Input()
    ListData;
    date = new Date();
    constructor(
        private worklogApiService: WorklogApiService,
    ) { }

    ngOnInit() {
    }

    exportData() {
        console.log(IncomeFlag.typeGetListService);
        if (IncomeFlag.typeGetListService === 'corporate') {
            this.exportCorporate();
        } else {
            this.exportIndividual();
        }
    }

    private exportCorporate() {
        this.worklogApiService.exportDataCorporate().subscribe(res => {
            this.downloadFile(res, 'income_corporate.csv');
        }, err => {
            console.log(err);
            alert(`Can't export corporate income to CSV file.`);
        });
    }

    private exportIndividual() {
        this.worklogApiService.exportDataIndividual().subscribe(res => {
            this.downloadFile(res, 'income_individual.csv');
        }, err => {
            console.log(err);
            alert(`Can't export individual income to CSV file.`);
        });
    }

    private downloadFile(data: any, filename: string) {
        const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
