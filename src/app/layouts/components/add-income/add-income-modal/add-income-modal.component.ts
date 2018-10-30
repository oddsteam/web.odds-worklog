import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmIncomeModalComponent } from '../confirm-income-modal/confirm-income-modal.component';
import { AddIncome } from 'src/app/layouts/models/add-income-model';

@Component({
    selector: 'app-add-income-modal',
    templateUrl: './add-income-modal.component.html',
    styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent implements OnInit {

    addIncome: AddIncome = {
        totalIncome: 0,
        note: ''
    };

    constructor(
        public activeModal: NgbActiveModal,
        public config: NgbModalConfig,
        private modalService: NgbModal,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() { }

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
