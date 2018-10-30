import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalculateIncomeModel, AddIncome } from 'src/app/layouts/models/add-income-model';
import { IncomeService } from 'src/app/layouts/services/income.service';

@Component({
    selector: 'app-confirm-income-modal',
    templateUrl: './confirm-income-modal.component.html',
    styleUrls: ['./confirm-income-modal.component.scss']
})
export class ConfirmIncomeModalComponent implements OnInit {

    calculateIncomeModel: CalculateIncomeModel = {
        totalIncome: '',
        vat: '',
        wht: '',
        netIncome: ''
    };
    // tslint:disable-next-line:no-input-rename
    @Input('addIncome') addIncome: AddIncome;

    constructor(
        public activeModal: NgbActiveModal,
        private incomeService: IncomeService
    ) {
        // this.mock();
    }

    ngOnInit() {
        this.calculateIncomeModel.totalIncome = this.addIncome.totalIncome.toString();
        this.updateData();
    }

    onCancelPress() {
        this.activeModal.close();
    }

    onConfirmPress() {
        this.AddIncomeConfirm();
    }

    private mock() {
        this.calculateIncomeModel.totalIncome = '100';
        this.updateData();
    }

    private AddIncomeConfirm() {
        this.incomeService.addIncomeConfirm(this.addIncome).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    private updateData() {
        this.calculateIncomeModel.vat = this.calVAT(this.calculateIncomeModel.totalIncome);
        this.calculateIncomeModel.wht = this.calWHT(this.calculateIncomeModel.vat);
        this.calculateIncomeModel.netIncome = this.calTotal(
            this.calculateIncomeModel.totalIncome,
            this.calculateIncomeModel.vat,
            this.calculateIncomeModel.wht
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
