import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmIncomeModalComponent } from '../confirm-income-modal/confirm-income-modal.component';
import { AddIncomeInterface, AddIncomeService } from 'src/app/layouts/services/add-income-service/add-income.service';

@Component({
    selector: 'app-add-income-modal',
    templateUrl: './add-income-modal.component.html',
    styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent implements OnInit {

    addIncome: AddIncomeInterface = {
        totalIncome: 0,
        note: ''
    };

    constructor(
        public activeModal: NgbActiveModal,
        public config: NgbModalConfig,
        private modalService: NgbModal,
        private addIncomeApi: AddIncomeService
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
