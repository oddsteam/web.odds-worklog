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
        // (IncomeFlag.typeGetListService) ?
        this.worklogApiService.exportDataIndividual().subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err);
        });
        // this.downloadFile([10, 20]);
    }

    private downloadFile(data: any) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }
}
