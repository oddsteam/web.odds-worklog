import { Component, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { StateService } from '../../../core/state.service';
import { WorklogApiService } from '../../../core/worklog-api.service';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('templateModal') templateModal: TemplateRef<any>;
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

    constructor(private fb: FormBuilder, private worklogApiService: WorklogApiService
        , private stateService: StateService, private modalService: BsModalService
    ) { }

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
        this.tableListForm = this.fb.group({
            id: [this.ListData !== null ? this.ListData[0].user.id : ''],
            statusTavi: [this.ListData !== null ? this.ListData[0].user.statusTavi : ''],
            items: this.fb.array([this.createItem()])

        });
        this.getRoleUser();
        this.updateForm();
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


    updateForm() {
        let j = 1;
        if (this.ListData != null) {
            if (this.ListData.length > 0) {
                const lengthExcludeInital = this.ListData.length - 2;
                const items = this.tableListForm.get('items') as FormArray;
                if (lengthExcludeInital >= 0) {
                    this.pushArray(lengthExcludeInital);
                    for (let i = 0; i < items.length; i++) {
                        items.controls[i].get('id').setValue(this.ListData[j].user.id);
                        items.controls[i].get('statusTavi').setValue(this.ListData[j].user.statusTavi);
                        j += 1;
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
        let user = new User();
        user = this.ListData.filter(a => a.user.id === this.tableListForm.get('id').value)[0].user;
        user.statusTavi = this.tableListForm.value.statusTavi;
        this.worklogApiService.updateStatusTaviUser(this.tableListForm.get('id').value, user).subscribe((res) => {
        });
        if (this.ListData.length - 2 >= 0) {
            for (let i = 0; i < items.controls.length; i++) {
                user = this.ListData.filter(a => a.user.id === items.controls[i].get('id').value)[0].user;
                user.statusTavi = items.controls[i].value.statusTavi;
                this.worklogApiService.updateStatusTaviUser(items.controls[i].get('id').value, user).subscribe((res) => {
                });
            }
        }
        this.modalRef.hide();

    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,
            Object.assign({}, { ignoreBackdropClick: true, })
        );
    }
}
