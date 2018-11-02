import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { CalculateIncomeModel, AddIncome } from 'src/app/shared/model/add-income-model';
import { IncomeFlag } from 'src/app/shared/model/income-flag';

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
        private worklogApiService: WorklogApiService
    ) { }

    ngOnInit() {
        this.calculateIncomeModel.totalIncome = this.addIncome.totalIncome;
        this.updateData();
    }

    onCancelPress() {
        this.activeModal.close();
    }

    onConfirmPress() {
        if (IncomeFlag.isUpdate) {
            this.updateIncomeService();
        } else {
            this.addIncomeConfirm();
        }
    }

    isVat(): boolean {
        return IncomeFlag.typeUser === 'corporate' ? true : false;
    }

    private addIncomeConfirm() {
        this.worklogApiService.addIncomeConfirm(this.addIncome).subscribe(res => {
            this.reloadPage();
        }, err => {
            console.log(err);
        });
    }

    private updateIncomeService() {
        this.worklogApiService.updateIncomeService(this.addIncome).subscribe(res => {
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
        this.calculateIncomeModel.netIncome = this.calNetIncomeCorporate(
            this.calculateIncomeModel.totalIncome,
            IncomeFlag.typeUser === 'corporate' ? this.calculateIncomeModel.vat : '0',
            this.calculateIncomeModel.wht
        );
    }

    calVAT(netIncome: string): string {
        return (this.stringToNumber(netIncome) * 0.07).toString();
    }

    calWHT(netIncome: string): string {
        return (this.stringToNumber(netIncome) * 0.03).toString();
    }

    calNetIncomeCorporate(totalIncome: string, vat: string, wht: string): string {
        return (
            this.stringToNumber(totalIncome) +
            this.stringToNumber(vat) -
            this.stringToNumber(wht)
        ).toString();
    }

    calNetIncomeIndividual(totalIncome: string, wht: string): string {
        return (
            this.stringToNumber(totalIncome) -
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
