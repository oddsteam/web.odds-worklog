import { Component, Input, OnInit, OnDestroy, ViewChild, OnChanges } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { IncomeFlag } from '../../model/income-flag';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnDestroy, OnChanges {
    @Input() ListData;
    dtOption;
    dtTrigger: Subject<any> = new Subject();

    constructor(
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
}
