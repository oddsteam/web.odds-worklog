import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IncomeModel } from '../model/income-model';
import { ConfirmIncomePresenter } from './confirm-income-modal-presenter';

@Component({
    selector: 'app-confirm-income-modal',
    templateUrl: './confirm-income-modal.component.html',
    styleUrls: ['./confirm-income-modal.component.scss'],
    providers: [
        ConfirmIncomePresenter
    ]
})
export class ConfirmIncomeModalComponent implements OnInit {

    incomeModel: IncomeModel;
    constructor(
        public activeModal: NgbActiveModal,
        private confirmIncomePresenter: ConfirmIncomePresenter
    ) {
        this.mock();
    }

    ngOnInit() {
        
    }

    onCancelPress() {
        this.activeModal.close();
    }
    
    onConfirmPress() {
        this.activeModal.close();
    }

    private mock() {
        this.incomeModel = {
            netIncome: "999999",
            vat: this.confirmIncomePresenter.calVAT("999999"),
            wht: this.confirmIncomePresenter.calWHT("999999"),
            totalIncome: this.confirmIncomePresenter.calTotal("999999")
        }
    }
}
