import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalculateIncomeModel, AddIncome } from 'src/app/layouts/models/add-income-model';
import { IncomeService } from 'src/app/layouts/services/income.service';
import { IncomeFlag } from 'src/app/layouts/models/income-flag';

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
        this.calculateIncomeModel.totalIncome = this.addIncome.totalIncome;
        // console.log(this.calculateIncomeModel.totalIncome);
        this.updateData();
    }

    onCancelPress() {
        this.activeModal.close();
    }

    onConfirmPress() {
        if (IncomeFlag.flag) {
            this.updateIncomeService();
        } else {
            this.addIncomeConfirm();
        }
    }

    private mock() {
        this.calculateIncomeModel.totalIncome = '100';
        this.updateData();
    }

    private addIncomeConfirm() {
        this.incomeService.addIncomeConfirm(this.addIncome).subscribe(res => {
            this.reloadPage();
        }, err => {
            console.log(err);
        });
    }

    private updateIncomeService() {
        this.incomeService.updateIncomeService(this.addIncome).subscribe(res => {
            this.reloadPage();
        }, err => {
            console.log(err);
        });
    }

    private reloadPage() {
        window.location.reload();
        setTimeout(() => { this.activeModal.close(); });
    }

    private updateData() {
        this.calculateIncomeModel.vat = this.calVAT(this.calculateIncomeModel.totalIncome);
        this.calculateIncomeModel.wht = this.calWHT(this.calculateIncomeModel.totalIncome);
        this.calculateIncomeModel.netIncome = this.calTotal(
            this.calculateIncomeModel.totalIncome,
            this.calculateIncomeModel.vat,
            this.calculateIncomeModel.wht
        );
    }

    calVAT(netIncome: string): string {
        return (this.stringToNumber(netIncome) * 0.07).toString();
    }

    calWHT(netIncome: string): string {
        return (this.stringToNumber(netIncome) * 0.03).toString();
    }

    calTotal(netIncome: string, vat: string, wht: string): string {
        return (
            this.stringToNumber(netIncome) +
            this.stringToNumber(vat) -
            this.stringToNumber(wht)
        ).toString();
    }

    stringToNumber(text: string): number {
        return Number(this.cutComma(text));
    }

    private cutComma(text: string): string {
        return text.replace(/,/g, '');
    }
}
