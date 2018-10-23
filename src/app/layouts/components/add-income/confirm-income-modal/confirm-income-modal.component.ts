import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddIncomeModel } from 'src/app/layouts/models/add-income-model';


@Component({
    selector: 'app-confirm-income-modal',
    templateUrl: './confirm-income-modal.component.html',
    styleUrls: ['./confirm-income-modal.component.scss']
})
export class ConfirmIncomeModalComponent implements OnInit {


    incomeModel: AddIncomeModel = {
        netIncome: '',
        vat: '',
        wht: '',
        totalIncome: ''
    };

    // tslint:disable-next-line:no-input-rename
    @Input('netIncome') netIncome: string;

    constructor(
        public activeModal: NgbActiveModal,
    ) {
        // this.mock();
    }

    ngOnInit() {
        this.incomeModel.netIncome = this.netIncome;
        this.updateData();
    }

    onCancelPress() {
        this.activeModal.close();
    }

    onConfirmPress() {
        this.activeModal.close();
    }

    private updateData() {
        this.incomeModel.vat = this.calVAT(this.incomeModel.netIncome);
        this.incomeModel.wht = this.calWHT(this.incomeModel.vat);
        this.incomeModel.totalIncome = this.calTotal(
            this.incomeModel.netIncome,
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
