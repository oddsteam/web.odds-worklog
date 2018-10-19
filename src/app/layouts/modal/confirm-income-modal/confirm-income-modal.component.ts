import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IncomeModel } from '../model/income-model';

@Component({
  selector: 'app-confirm-income-modal',
  templateUrl: './confirm-income-modal.component.html',
  styleUrls: ['./confirm-income-modal.component.scss']
})
export class ConfirmIncomeModalComponent implements OnInit {

    incomeModel: IncomeModel;
  constructor(public activeModal: NgbActiveModal) { 
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
            vat: this.calVAT("999999"),
            wht: this.calVAT("999999"),
            totalIncome: this.calTotal("999999")
        }
    }

    // จำสูตรไม่ได้ครับ กลับไปทำต่อครับ
    private calVAT(netIncome: string): string {
        return (Number(this.cutComma(netIncome))).toString();
    }

    private calWHM(netIncome: string): string {
        return (Number(this.cutComma(netIncome))).toString();
    }

    private calTotal(netIncome: string): string {
        return (Number(this.cutComma(netIncome))).toString();
    }

    private cutComma(text: string): string {
        return text.replace(/,/g, "");
    }
    //
}
