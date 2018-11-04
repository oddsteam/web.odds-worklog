import { Component, OnInit, Input } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { IncomeFlag } from '../../model/income-flag';
import { DatePipe } from '@angular/common';

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
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
    }

    exportData() {
        // (IncomeFlag.typeGetListService) ?
        this.worklogApiService.exportDataCorporate().subscribe(res => {
            console.log(res);
            // this.downloadFile(res);
        });
        // this.downloadFile([10, 20]);
    }

    private downloadFile(data: Array<any>) {
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(data[0]);
        const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        const csvArray = csv.join('\r\n');

        const a = document.createElement('a');
        const blob = new Blob([csvArray], { type: 'text/csv' }),
            url = window.URL.createObjectURL(blob);

        a.href = url;
        const dateFormat = this.datePipe.transform(this.date, 'MMMM yyyy');
        a.download = `${dateFormat} ${IncomeFlag.typeGetListService}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
