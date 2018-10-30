import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmIncomeModalComponent } from '../confirm-income-modal/confirm-income-modal.component';
import { AddIncome } from 'src/app/layouts/models/add-income-model';
import { AddIncomeResponse } from 'src/app/layouts/models/add-income-model-response';

@Component({
    selector: 'app-add-income-modal',
    templateUrl: './add-income-modal.component.html',
    styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent implements OnInit {

    title = 'Add Income';

    // tslint:disable-next-line:no-input-rename
    @Input('addIncome') addIncome: AddIncome = {
        totalIncome: null,
        note: ''
    };

    // tslint:disable-next-line:no-input-rename
    @Input('flagIncome') flagIncome: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        public config: NgbModalConfig,
        private modalService: NgbModal,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        if (this.title) {
            this.title = 'Edit Income';
        }
    }

    submit() {
        const modalConfirmIncome = this.modalService.open(ConfirmIncomeModalComponent, { centered: true });
        modalConfirmIncome.componentInstance.addIncome = this.addIncome;
        setTimeout(() => { this.activeModal.close(); });
    }

    inputIncomeAmount(data: number) {
        this.addIncome.totalIncome = data;
    }

    inputNote(note: string) {
        this.addIncome.note = note;
    }

    disibleButton(): boolean {
        if (!this.addIncome.totalIncome || this.addIncome.totalIncome < 1) { return true; }
        return false;
    }
}
