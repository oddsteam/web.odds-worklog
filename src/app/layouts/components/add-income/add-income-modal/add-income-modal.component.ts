import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmIncomeModalComponent } from '../confirm-income-modal/confirm-income-modal.component';
import { IncomeService } from 'src/app/layouts/services/income-service/income.service';


@Component({
    selector: 'app-add-income-modal',
    templateUrl: './add-income-modal.component.html',
    styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent implements OnInit {

    netIncome: number;

    constructor(
        public activeModal: NgbActiveModal,
        public config: NgbModalConfig,
        private modalService: NgbModal,
        private addIncomeApi: IncomeService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {}

    submit() {
        const modalConfirmIncome = this.modalService.open(ConfirmIncomeModalComponent, { centered: true });
        modalConfirmIncome.componentInstance.netIncome = this.netIncome.toString();
        setTimeout(() => { this.activeModal.close(); });
        // this.addIncomeApi.addIncomes().then(res => {
        //     this.modalService.open(ConfirmIncomeModalComponent, { centered: true });
        //     setTimeout(() => { this.activeModal.close(); });
        // }).catch(err => {});
    }

    inputIncomeAmount(data: number) {
        this.netIncome = data;
    }

    disibleButton(): boolean {
        if (!this.netIncome || this.netIncome < 1) { return true; }
        return false;
    }

    private getUserId(): string {
        return '';
    }
}
