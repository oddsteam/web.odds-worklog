import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddIncomeModalComponent } from './add-income-modal/add-income-modal.component';
import { IncomeService } from '../../services/income.service';
import { AddIncomeResponse } from '../../models/add-income-model-response';
import { AddIncome } from '../../models/add-income-model';
import { IncomeFlag } from '../../models/income-flag';

@Component({
    selector: 'app-add-income',
    templateUrl: './add-income.component.html',
    styleUrls: ['./add-income.component.scss'],
})
export class AddIncomeComponent implements OnInit {

    salary = '0';
    note = 'อยากได้เงินก็กรอกมาสิ';
    nameButton = 'Add Income';
    styleButton = 'btn btn-blue';
    incomeFlag = false;
    getIncomeByUsers: AddIncomeResponse;

    constructor(
        public config: NgbModalConfig,
        private modalService: NgbModal,
        private incomeService: IncomeService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.checkGetIncomeByID();
    }

    open() {
        const modal = this.modalService.open(AddIncomeModalComponent, { centered: true });
        IncomeFlag.flag = this.incomeFlag;
        modal.componentInstance.addIncome = this.getData(this.getIncomeByUsers);
    }

    styleIncome(): string {
        return this.styleButton;
    }

    private checkGetIncomeByID() {
        this.incomeService.getIncomeByUserID().subscribe(res => {
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
