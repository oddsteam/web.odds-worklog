import { Component, Input, OnInit, OnDestroy, ViewChild, OnChanges } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { IncomeFlag } from '../../model/income-flag';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    @Input() ListData;
    dtOption;
    dtTrigger: Subject<any> = new Subject();

    constructor(
        private worklogApiService: WorklogApiService,
    ) { }


    ngOnChanges(): void {
        if (this.ListData) {
            this.dtTrigger.next();
        }
    }

    ngOnInit() {
        this.dtOption = {
            paging: false,
            searching: false,
            info: false,
            language: {
                emptyTable: 'ไม่มีข้อมูล'
            },
            columnDefs: [{
                targets: [0, 1, 2, 3, 4],
                orderable: false
            }],
            order: [[5, 'asc']],
            destroy: true,
        };
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    exportData() {
        if (IncomeFlag.typeGetListService === 'corporate') {
            this.exportCorporate();
        } else {
            this.exportIndividual();
        }
    }

    exportCorporate() {
        this.worklogApiService.exportDataCorporate().subscribe(res => {
            this.downloadFile(res, 'income_corporate.csv');
        }, err => {
            console.log(err);
            alert(`Can't export corporate income to CSV file.`);
        });
    }

    exportIndividual() {
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
