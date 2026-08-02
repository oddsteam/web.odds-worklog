import { Component, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { StateService } from '../../../core/state.service';
import { WorklogApiService } from '../../../core/worklog-api.service';
import { StatusTavi } from '../../model/status-tavi';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('templateModal', { static: true }) templateModal: TemplateRef<any>;
    @Input() ListData;
    dtTrigger: Subject<any> = new Subject();
    swapArrowIconSort = false;
    order = 'status';
    isNoData = false;
    isShowLoading = true;
    tableListForm: FormGroup;
    items: FormArray;
    role: string;
    modalRef: BsModalRef;
    private siteNameById: { [id: string]: string } = {};

    constructor(private fb: FormBuilder, private worklogApiService: WorklogApiService
        , private stateService: StateService, private modalService: BsModalService
    ) { }

    ngOnChanges(): void {
        let indexOfCurrentUser;
        if (this.ListData) {
            const array: any = this.ListData;
            array.forEach((element, index) => {
                indexOfCurrentUser = element.user.firstName.indexOf(sessionStorage.getItem('firstName'));
                if (indexOfCurrentUser !== -1) {
                    array.splice(0, 0, array.splice(index, 1)[0]);
                    this.ListData = array;
                    return;
                }
            });
            this.dtTrigger.next('');
        } else {
            this.isNoData = true;
            this.isShowLoading = false;
        }
    }

    ngOnInit() {
        this.createForm();
        this.getListFisrtUser();
        this.getRoleUser();
        this.loadSites();
        this.updateForm();
    }

    loadSites() {
        this.worklogApiService.getSitesData().subscribe((sites) => {
            this.siteNameById = {};
            (sites || []).forEach((site) => {
                if (site && site.id) {
                    this.siteNameById[site.id] = site.name || '-';
                }
            });
        });
    }

    getSiteName(user: User): string {
        if (!user || !user.siteId) {
            return '-';
        }
        return this.siteNameById[user.siteId] || '-';
    }
    createForm() {
        this.tableListForm = this.fb.group({
            id: [''],
            statusTavi: [''],
            items: this.fb.array([this.createItem()])
        });
    }
    createItem(): FormGroup {
        return this.fb.group({
            id: '',
            statusTavi: ''
        });
    }

    getRoleUser() {
        this.stateService.getTypeUser().subscribe((res) => {
            this.role = res;
        });
    }
    addItem(): void {
        this.items = this.tableListForm.get('items') as FormArray;
        this.items.push(this.createItem());
    }

    getListFisrtUser() {
        if (this.ListData !== undefined) {
            this.tableListForm.get('id').setValue(this.ListData[0].user.id);
            this.tableListForm.get('statusTavi').setValue(this.ListData[0].user.statusTavi);
        }
    }

    updateForm() {
        if (this.ListData !== undefined) {
            if (this.ListData.length > 0) {
                const lengthExcludeInital = this.ListData.length - 2;
                const items = this.tableListForm.get('items') as FormArray;
                if (lengthExcludeInital >= 0) {
                    this.pushArray(lengthExcludeInital);
                    const ListPersonSort: any = this.ListData;
                    ListPersonSort.splice(0, 1);
                    ListPersonSort.sort((n1, n2) => {
                        const a = n1.status.toLowerCase();
                        const b = n2.status.toLowerCase();
                        return a > b ? 1 : (a < b ? -1 : 0);
                    });
                    for (let i = 0; i < ListPersonSort.length; i++) {
                        items.controls[i].get('id').setValue(ListPersonSort[i].user.id);
                        items.controls[i].get('statusTavi').setValue(ListPersonSort[i].user.statusTavi);
                    }
                }
            }
        }
    }

    pushArray(length: number) {
        for (let i = 0; i < length; i++) {
            (<FormArray>this.tableListForm.get('items')).push(this.createItem());

        }
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

    updateAllUser() {
        const items = this.tableListForm.get('items') as FormArray;
        const statusTavi = new Array<StatusTavi>();
        let user = new User();
        user = this.ListData.filter(a => a.user.id === this.tableListForm.get('id').value)[0].user;
        user.statusTavi = this.tableListForm.value.statusTavi;
        statusTavi.push({ id: this.tableListForm.get('id').value, user: user });
        if (this.ListData.length - 2 >= 0) {
            for (let i = 0; i < items.controls.length; i++) {
                user = this.ListData.filter(a => a.user.id === items.controls[i].get('id').value)[0].user;
                user.statusTavi = items.controls[i].value.statusTavi;
                statusTavi.push({ id: items.controls[i].get('id').value, user: user });
            }
        }
        this.worklogApiService.updateStatusTaviUser(statusTavi).subscribe((res) => {
        });
        this.modalRef.hide();

    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,
            Object.assign({}, { ignoreBackdropClick: true, })
        );
    }
}
