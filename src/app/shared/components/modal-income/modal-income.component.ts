import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from 'src/app/core/state.service';
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
  dailyIncome: string;
  totalIncome: string;
  vatPrimary: string;
  vatSpecial: string;
  whtPrimary: string;
  whtSpecial: string;
  constructor(
    private fb: FormBuilder,
    private worklogApiService: WorklogApiService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.getDailyIncome();
    this.onSetupForm();
    this.title = 'Add Income';
  }

  isVat(): boolean {
    return this.typeVat === 'Y' ? true : false;
  }

  getDailyIncome() {
    this.dailyIncome = this.worklogApiService.getDailyIncome();
  }

  onSetupForm() {

    if (this.addIncomeData === null) {
      this.addIncomeData = {
        id: '',
        userId: '',
        submitDate: '',
        note: '',
        vat: '',
        wht: '',
        workDate: '',
        netIncome: '',
        workingHours: '',
        specialIncome: '',
        netSpecialIncome: '',
        totalIncome: '',
      };
      this.fg = this.fb.group({
        note: ['', Validators.required],
        workDate: ['', Validators.required],
        workingHours: ['', Validators.required],
        specialIncome: ['', Validators.required]
      });
    } else {
      this.fg = this.fb.group({
        note: [this.addIncomeData.note, Validators.required],
        workDate: [this.addIncomeData.workDate, Validators.required],
        workingHours: [this.addIncomeData.workingHours, Validators.required],
        specialIncome: [this.addIncomeData.specialIncome, Validators.required]
      });
      this.inputIncomeAmount();
      this.inputWorkingHours();
    }
  }

  calTotalIncome() {
    const dailyIncome = this.stringToNumber(this.dailyIncome);
    const workDate = this.stringToNumber(this.workDate.value);
    const specialIncome = this.stringToNumber(this.specialIncome.value);
    const workingHours = this.stringToNumber(this.workingHours.value);
    const netIncome = dailyIncome * workDate;
    const netSpecialIncome = specialIncome * workingHours;
    this.totalIncome = String(netIncome + netSpecialIncome);
    this.addIncomeData.netIncome = String(netIncome);
    this.addIncomeData.netSpecialIncome = String(netSpecialIncome);
  }

  calTax() {
    this.vatPrimary = this.calVAT(this.addIncomeData.netIncome);
    this.whtPrimary = this.calWHT(this.addIncomeData.netIncome);
    this.vatSpecial = this.calVAT(this.addIncomeData.netSpecialIncome);
    this.whtSpecial = this.calWHT(this.addIncomeData.netSpecialIncome);
  }

  onSubmit() {
    this.calTotalIncome();
    this.calTax();
    this.title = 'Confirm Income';
    this.addIncomeData.totalIncome = this.totalIncome;
    this.addIncomeAlready = true;
    this.updateData();
  }

  onConfirm() {
    if (IncomeFlag.isUpdate) {
      this.updateIncomeService(this.cutComma(this.specialIncome.value));
    } else {
      this.addIncomeConfirm(this.cutComma(this.specialIncome.value));
    }
    this.closeModalEmit.emit(true);
    this.addIncomeEmit.emit(true);
  }

  updateData() {
    this.specialIncome.setValue(this.specialIncome.value === '' ? '0' : this.specialIncome.value);
    this.addIncomeData.vat = this.calVAT(this.addIncomeData.totalIncome);
    this.addIncomeData.wht = this.calWHT(this.addIncomeData.totalIncome);
    this.addIncomeData.totalIncome = this.calNetIncome(
      this.addIncomeData.totalIncome,
      this.typeVat === 'Y' ? this.addIncomeData.vat : '0',
      this.addIncomeData.wht
    );
  }

  addIncomeConfirm(specialIncome) {
    this.fg.patchValue({
      specialIncome: specialIncome
    });
    const addIncome = this.fg.value;
    this.worklogApiService.addIncomeConfirm(addIncome).subscribe(res => {
      IncomeFlag.isUpdate = true;
      this.stateService.triggerListIncomeCorporate();
      this.stateService.triggerListIncomeIndividual();
      this.closeModalEmit.emit(true);
    }, err => {
      console.log(err);
    });
  }

  updateIncomeService(specialIncome) {
    this.fg.patchValue({
      specialIncome: specialIncome
    });
    const addIncome = this.fg.value;
    this.worklogApiService.updateIncomeService(addIncome).subscribe(res => {
      this.stateService.triggerListIncomeCorporate();
      this.stateService.triggerListIncomeIndividual();
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
    const totalIncome = Number(this.totalIncome);
    if (totalIncome < 1) {
      return true;
    }
    return false;
  }

  inputIncomeAmount() {
    const specialIncome = this.specialIncome.value;
    this.flagChange = true;
    // this.numberFormat = this.formatInteger(this.totalIncome);
    const stringFormat = this.formatInteger(specialIncome);
    const realFormat = this.formatCurrency(stringFormat);
    this.fg.get('specialIncome').setValue(realFormat);
  }

  inputWorkingHours() {
    this.flagChange = true;
    const workingHours = this.workingHours.value;
    this.fg.get('workingHours').setValue(workingHours);
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
  get workDate(): AbstractControl {
    return this.fg.get('workDate');
  }

  get specialIncome(): AbstractControl {
    return this.fg.get('specialIncome');
  }

  get workingHours(): AbstractControl {
    return this.fg.get('workingHours');
  }
}
