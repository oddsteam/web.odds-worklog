import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddIncomeResponse } from '../../model/add-income-model-response';
import { IncomeFlag } from '../../model/income-flag';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-modal-income',
  templateUrl: './modal-income.component.html',
  styleUrls: ['./modal-income.component.scss']
})
export class ModalIncomeComponent implements OnInit {
  @Output() closeModalEmit = new EventEmitter();
  @Input() openModal;
  @Input() addIncomeData: AddIncomeResponse;
  title: string;
  fg: FormGroup;
  addIncomeAlready: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private worklogApiService: WorklogApiService
  ) { }

  ngOnInit() {
    this.onSetupForm();
    this.title = 'Add Income';
  }

  isVat() {
    return true;
  }

  onSetupForm() {
    if (this.addIncomeData === null) {
      this.addIncomeData = {
        id: '',
        userId: '',
        totalIncome: '',
        netIncome: '',
        submitDate: '',
        note: '',
        vat: '',
        wht: '',
      };
      this.fg = this.fb.group({
        totalIncome: ['', Validators.required],
        note: ['', Validators.required]
      });
    } else {
      this.fg = this.fb.group({
        totalIncome: [this.addIncomeData.totalIncome, Validators.required],
        note: [this.addIncomeData.note, Validators.required]
      });
    }
  }

  onSubmit() {
    const { totalIncome } = this.fg.getRawValue();
    this.title = 'Confirm Income';
    this.addIncomeData.totalIncome = totalIncome;
    this.addIncomeAlready = true;
    this.updateData();
  }

  onConfirm() {
    if (IncomeFlag.isUpdate) {
      this.updateIncomeService();
    } else {
      this.addIncomeConfirm();
    }
    this.closeModalEmit.emit(true);
  }

  private updateData() {
    this.addIncomeData.vat = this.calVAT(this.addIncomeData.totalIncome);
    this.addIncomeData.wht = this.calWHT(this.addIncomeData.totalIncome);
    this.addIncomeData.netIncome = this.calNetIncome(
      this.addIncomeData.totalIncome,
      IncomeFlag.typeUser === 'corporate' ? this.addIncomeData.vat : '0',
      this.addIncomeData.wht
    );
  }

  private addIncomeConfirm() {
    const { totalIncome, note } = this.fg.getRawValue();
    const addIncome = { note: note, totalIncome: totalIncome };
    this.worklogApiService.addIncomeConfirm(addIncome).subscribe(res => {
      this.closeModalEmit.emit(true);
    }, err => {
      console.log(err);
    });
  }

  private updateIncomeService() {
    const { totalIncome, note } = this.fg.getRawValue();
    const addIncome = { note: note, totalIncome: totalIncome };
    this.worklogApiService.updateIncomeService(addIncome).subscribe(res => {
      this.closeModalEmit.emit(true);
    }, err => {
      console.log(err);
    });
  }

  calVAT(netIncome: string): string {
    return (this.stringToNumber(netIncome) * 0.07).toString();
  }

  calWHT(netIncome: string): string {
    return (this.stringToNumber(netIncome) * 0.03).toString();
  }

  calNetIncome(totalIncome: string, vat: string, wht: string): string {
    return (
      this.stringToNumber(totalIncome) +
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

  onCancel() {
    this.addIncomeAlready = false;
    this.title = 'Add Income';
  }

  closeModal() {
    this.closeModalEmit.emit(true);
  }

  onDisableButton() {

  }

}
