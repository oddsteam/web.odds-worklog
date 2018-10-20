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

    incomeModel: IncomeModel = {
        netIncome: "",
        vat: "",
        wht: "",
        totalIncome: ""
    };

    constructor(
        public activeModal: NgbActiveModal,
        private confirmIncomePresenter: ConfirmIncomePresenter
    ) {
        // this.mock();
        this.incomeModel.netIncome = "90000";
        this.updateData()
    }

    ngOnInit() {
        
    }

    onCancelPress() {
        this.activeModal.close();
    }

    onConfirmPress() {
        this.activeModal.close();
    }

    private updateData() {
        this.incomeModel.vat = this.confirmIncomePresenter.calVAT(this.incomeModel.netIncome);
        this.incomeModel.wht = this.confirmIncomePresenter.calWHT(this.incomeModel.vat);
        this.incomeModel.totalIncome = this.confirmIncomePresenter.calTotal(
            this.incomeModel.netIncome,
            this.incomeModel.vat,
            this.incomeModel.wht
        );
    }

    // private mock() {
    //     this.incomeModel = {
    //         netIncome: "999999",
    //         vat: this.confirmIncomePresenter.calVAT("999999"),
    //         wht: this.confirmIncomePresenter.calWHT("999999"),
    //         totalIncome: this.confirmIncomePresenter.calTotal("999999")
    //     }
    // }
}
