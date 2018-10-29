import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmIncomeModalComponent } from '../confirm-income-modal/confirm-income-modal.component';
import { IncomeService } from 'src/app/layouts/services/income.service';
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
        private addIncomeApi: IncomeService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() { }

    submit() {
        this.modalService.open(ConfirmIncomeModalComponent, { centered: true });
        // modalConfirmIncome.componentInstance.totalIncome = this.addIncome.totalIncome.toString();
        setTimeout(() => { this.activeModal.close(); });
        // this.addIncomeService();
    }

    inputIncomeAmount(data: number) {
        this.addIncome.totalIncome = data;
    }

    disibleButton(): boolean {
        if (!this.addIncome.totalIncome || this.addIncome.totalIncome < 1) { return true; }
        return false;
    }

    private addIncomeService() {
        this.addIncomeApi.addIncome(this.addIncome).then(res => {
            const modalConfirmIncome = this.modalService.open(ConfirmIncomeModalComponent, { centered: true });
            modalConfirmIncome.componentInstance.incomeModel = res;
            setTimeout(() => { this.activeModal.close(); });
        }).catch(err => { });
    }
}
