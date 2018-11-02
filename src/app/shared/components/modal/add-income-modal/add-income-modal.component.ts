import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmIncomeModalComponent } from '../confirm-income-modal/confirm-income-modal.component';
import { AddIncome } from 'src/app/shared/model/add-income-model';
import { IncomeFlag } from 'src/app/shared/model/income-flag';

@Component({
    selector: 'app-add-income-modal',
    templateUrl: './add-income-modal.component.html',
    styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent implements OnInit {

    title = 'Add Income';

    // tslint:disable-next-line:no-input-rename
    @Input('addIncome') addIncome: AddIncome = {
        totalIncome: '',
        note: ''
    };

    totalIncome: string;

    constructor(
        public activeModal: NgbActiveModal,
        public config: NgbModalConfig,
        private modalService: NgbModal,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        if (IncomeFlag.flag) {
            this.title = 'Edit Income';
            this.totalIncome = this.addIncome.totalIncome;
        }
    }

    submit() {
        const modalConfirmIncome = this.modalService.open(ConfirmIncomeModalComponent, { centered: true });
        console.log(this.addIncome);
        modalConfirmIncome.componentInstance.addIncome = this.addIncome;
        setTimeout(() => { this.activeModal.close(); });
    }

    inputIncomeAmount(data: string) {
        data = data.replace(/[^0-9.]/g, '');
        data = data.indexOf(',') !== -1 ? data.replace(/,/g, '') : data;
        this.totalIncome = this.formatInteger(data);
        this.addIncome.totalIncome = data;
        console.log(this.addIncome.totalIncome);
        console.log(this.totalIncome);
    }

    inputNote(note: string) {
        this.addIncome.note = note;
    }

    disibleButton(): boolean {
        if (!this.addIncome.totalIncome || Number(this.addIncome.totalIncome) < 1) { return true; }
        return false;
    }

    xxx(x) {
        x = x.replace(/[^0-9.]/g, '');
        x = x.indexOf(',') !== -1 ? x.replace(/,/g, '') : x;
        this.totalIncome = this.formatInteger(x);
    }

    validatePureText(value: string) {
        return /[^0-9.]/.test(value);
    }

    formatInteger(Result: string): string {
        Result = Result.substring(0, 9);
        Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
        Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
        Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
        return Result;
    }
}
