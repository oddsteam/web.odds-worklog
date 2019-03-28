import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/model/user';

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
        let indexOfCurrentUser;
        if (this.ListData) {
            const array: any = this.ListData;
            array.forEach((element, index) => {
                indexOfCurrentUser = element.user.id.indexOf(sessionStorage.getItem('idUser'));
                if (indexOfCurrentUser !== -1) {
                    array.splice(0, 0, array.splice(index, 1)[0]);
                    this.ListData = array;
                    return;
                }
            });
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

    checkValue(data: string): string {
        return data.trim() === '' ? '-' : data.trim();
    }

    getName(user: User): string {
        if (user.role === 'corporate') {
            return this.checkValue(user.corporateName ? user.corporateName : '');
        }
        return this.checkValue(user.firstName + ' ' + user.lastName);
    }
}
