import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddIncomeModel } from 'src/app/layouts/models/add-income-model';
import { AddIncomeInterface } from 'src/app/layouts/services/income-service/income.service';


@Component({
    selector: 'app-confirm-income-modal',
    templateUrl: './confirm-income-modal.component.html',
    styleUrls: ['./confirm-income-modal.component.scss']
})
export class ConfirmIncomeModalComponent implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input('incomeModel') incomeModel: AddIncomeModel = {
        id: '',
        userId: '',
        totalIncome: '',
        netIncome: '',
        note: '',
        vat: '',
        wht: ''
    };

    constructor(
        public activeModal: NgbActiveModal,
    ) {
        this.mock();
    }

    ngOnInit() {
        // this.incomeModel.totalIncome = this.incomeModel.totalIncome.toString();
        // this.incomeModel.wht = this.calWHT(this.incomeModel.vat);
        // this.updateData();
    }

    onCancelPress() {
        this.activeModal.close();
    }

    onConfirmPress() {
        this.activeModal.close();
    }

    private mock() {
        this.incomeModel.totalIncome = '100';
        this.updateData();
    }

    private updateData() {
        this.incomeModel.vat = this.calVAT(this.incomeModel.totalIncome);
        this.incomeModel.wht = this.calWHT(this.incomeModel.vat);
        this.incomeModel.netIncome = this.calTotal(
            this.incomeModel.totalIncome,
            this.incomeModel.vat,
            this.incomeModel.wht
        );
    }

    private calVAT(netIncome: string): string {
        return (this.stringToNumber(netIncome) * 0.07).toString();
    }

    private calWHT(netIncome: string): string {
        return (this.stringToNumber(netIncome) * 0.03).toString();
    }

    private calTotal(netIncome: string, vat: string, wht: string): string {
        return (
            this.stringToNumber(netIncome) +
            this.stringToNumber(vat) -
            this.stringToNumber(wht)
        ).toString();
    }

    private stringToNumber(text: string): number {
        return Number(this.cutComma(text));
    }

    private cutComma(text: string): string {
        return text.replace(/,/g, '');
    }
}
