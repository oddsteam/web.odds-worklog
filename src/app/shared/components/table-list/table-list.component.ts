import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnDestroy, OnChanges {
    @Input() ListData;
    dtTrigger: Subject<any> = new Subject();
    swapArrowIconSort = false;
    order = 'status';
    constructor() { }

    ngOnChanges(): void {
        if (this.ListData) {
            this.dtTrigger.next();
        }
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }


    setOrder() {
        this.swapArrowIconSort = !this.swapArrowIconSort;
    }
}
