import { Component, OnInit } from '@angular/core';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { IncomeFlag } from 'src/app/shared/model/income-flag';
import { AddIncome } from 'src/app/shared/model/add-income-model';
import { AddIncomeModalComponent } from '../modal/add-income-modal/add-income-modal.component';

@Component({
    selector: 'app-add-income',
    templateUrl: './add-income.component.html',
    styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

    salary = '0';
    note = 'อยากได้เงินก็กรอกมาสิ';
    nameButton = 'Add Income';
    styleButton = 'btn btn-blue';
    incomeFlag = false;
    getIncomeByUsers: AddIncomeResponse;

    constructor(
        private config: NgbModalConfig,
        private modalService: NgbModal,
        private worklogApiService: WorklogApiService
    ) { }

    ngOnInit() {
        this.checkGetIncomeByID();
    }

    onOpen() {
        const modal = this.modalService.open(AddIncomeModalComponent, { centered: true });
        IncomeFlag.isUpdate = this.incomeFlag;
        modal.componentInstance.addIncome = this.getData(this.getIncomeByUsers);
    }

    styleIncome(): string {
        return this.styleButton;
    }

    private checkGetIncomeByID() {
        this.worklogApiService.getIncomeByUserID().subscribe(res => {
            if (res) {
                this.getIncomeByUsers = res;
                IncomeFlag.id = res.id;
                this.updateData(res);
            }
        });
    }

    private updateData(res: AddIncomeResponse) {
        this.incomeFlag = true;
        this.styleButton = 'btn btn-red';
        this.nameButton = 'Edit Income';
        this.salary = res.totalIncome;
        this.note = res.note;
    }

    private getData(res: AddIncomeResponse): AddIncome {
        return {
            totalIncome: (res && res.totalIncome) ? res.totalIncome : null,
            note: (res && res.note) ? res.note : ''
        };
    }
}
