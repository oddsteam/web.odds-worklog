import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeResponse } from '../../model/add-income-model-response';
import { IncomeFlag } from '../../model/income-flag';

@Component({
  selector: 'app-modal-income',
  templateUrl: './modal-income.component.html',
  styleUrls: ['./modal-income.component.scss']
})
export class ModalIncomeComponent implements OnInit {
  @Output() closeModalEmit = new EventEmitter();
  @Output() addIncomeEmit = new EventEmitter();
  @Input() openModal;
  @Input() typeUser;
  @Input() addIncomeData: AddIncomeResponse;
  @Input() typeVat;
  title: string;
  numberFormat: string;
  flagChange: Boolean = false;
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

  isVat(): boolean {
    return this.typeVat === 'Y' ? true : false;
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
      this.inputIncomeAmount();
    }
  }

  onSubmit() {
    let totalIncome;
    if (!this.flagChange) {
      totalIncome = this.fg.controls['totalIncome'].value;
    } else {
      totalIncome = this.numberFormat;
    }
    this.title = 'Confirm Income';
    this.addIncomeData.totalIncome = totalIncome;
    this.addIncomeAlready = true;
    this.updateData();
  }

  onConfirm() {
    let totalIncome;
    if (!this.flagChange) {
      totalIncome = this.totalIncome.value;
    } else {
      totalIncome = this.numberFormat;
    }
    if (IncomeFlag.isUpdate) {
      this.updateIncomeService(totalIncome);
    } else {
      this.addIncomeConfirm(totalIncome);
    }
    this.closeModalEmit.emit(true);
    this.addIncomeEmit.emit(true);
  }

  updateData() {
    this.addIncomeData.vat = this.calVAT(this.addIncomeData.totalIncome);
    this.addIncomeData.wht = this.calWHT(this.addIncomeData.totalIncome);
    this.addIncomeData.netIncome = this.calNetIncome(
      this.addIncomeData.totalIncome,
      this.typeVat === 'Y' ? this.addIncomeData.vat : '0',
      this.addIncomeData.wht
    );
  }

  addIncomeConfirm(totalIncome) {
    this.fg.patchValue({
      totalIncome: totalIncome
    });
    const addIncome = this.fg.value;
    this.worklogApiService.addIncomeConfirm(addIncome).subscribe(res => {
      IncomeFlag.isUpdate = true;
      this.closeModalEmit.emit(true);
    }, err => {
      console.log(err);
    });
  }

  updateIncomeService(totalIncome) {
    this.fg.patchValue({
      totalIncome: totalIncome
    });
    const addIncome = this.fg.value;
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

  disableButton(): boolean {
    const totalIncome = Number(this.totalIncome.value);
    if (totalIncome < 1) {
      return true;
    }
    return false;
  }

  inputIncomeAmount() {
    const totalIncome = this.totalIncome.value;
    this.flagChange = true;
    this.numberFormat = this.formatInteger(totalIncome);
    const stringFormat = this.formatInteger(totalIncome);
    const realFormat = this.formatCurrency(stringFormat);
    this.totalIncome.setValue(realFormat);
  }

  cutComma(text: string): string {
    return text.replace(/,/g, '');
  }

  formatInteger(data: string): string {
    data = data.replace(/[^0-9.]/g, '');
    data = data.indexOf(',') !== -1 ? data.replace(/,/g, '') : data;
    return data;
  }

  formatCurrency(Result: string): string {
    Result = Result.substring(0, 9);
    Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
    Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
    Result = Result.replace(/^(\d+)(\d{3})/, '$1,$2');
    return Result;
  }

  onCancel() {
    this.addIncomeAlready = false;
    this.title = 'Add Income';
  }

  closeModal() {
    this.closeModalEmit.emit(true);
  }

  get totalIncome(): AbstractControl {
    return this.fg.get('totalIncome');
  }
}
