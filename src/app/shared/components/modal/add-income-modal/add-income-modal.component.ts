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

    inputIncomeAmount(data: number) {
        this.addIncome.totalIncome = data.toString();
    }

    inputNote(note: string) {
        this.addIncome.note = note;
    }

    disibleButton(): boolean {
        if (!this.addIncome.totalIncome || Number(this.addIncome.totalIncome) < 1) { return true; }
        return false;
    }
}
