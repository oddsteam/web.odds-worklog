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
        private worklogApiService: WorklogApiService
    ) { }

    ngOnInit() {
    }

    exportData() {
        // (IncomeFlag.typeGetListService) ?
        this.worklogApiService.exportDataCorporate().subscribe(res => {
            console.log(res);
        });
    }
}
