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
    isNoData = false;
    isShowLoading = true;

    constructor() { }

    ngOnChanges(): void {
        let index;
        if (this.ListData) {
            const array: any = this.ListData;
            array.forEach((element, i) => {
                index = element.user.id.indexOf(sessionStorage.getItem('idUser'));
                if (index !== -1) {
                    index = i;
                    return;
                }
            });
            array.splice(0, 0, array.splice(index, 1)[0]);
            this.ListData = array;
            this.dtTrigger.next();
        } else {
            this.isNoData = true;
            this.isShowLoading = false;
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
