import { DatePipe } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap/modal';
import {ExportIncomeModal} from '../../model/export-income';
import {ModalMonthType} from './model';

@Component({
  selector: 'app-modal-export',
  templateUrl: './modal-export.component.html',
  styleUrls: ['./modal-export.component.scss']
})
export class ModalExportComponent implements OnInit {
  form: FormGroup;
  @Input() modalType: ModalMonthType;
  @Output() valueDate = new EventEmitter<ExportIncomeModal>();

  constructor(
    private modalRef: BsModalRef,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private datePipe: DatePipe,
    public options: ModalOptions
  ) { }

  ngOnInit(): void {
    const isSap = this.isSapMode;
    const isSpecific = this.modalType === ModalMonthType.SPECIFIC_MONTH;
    this.form = new FormGroup({
      dateEffective: new FormControl(isSap ? new Date() : null, isSap ? [Validators.required] : []),
      startDate: new FormControl(isSpecific ? new Date() : null, isSpecific ? [Validators.required] : []),
      endDate: new FormControl(isSpecific ? new Date() : null, isSpecific ? [Validators.required] : []),
    });
  }

  exportIncomeByMonth() {
      if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
      }
      const startDate = this.getStartDate(this.modalType, this.form.controls.startDate.value);
      const endDate = this.getEndDate(this.modalType, this.form.controls.endDate.value);
      const dateEffective = this.isSapMode
          ? this.ngbDateStructToDate(this.form.controls.dateEffective.value, 'dd/MM/yyyy')
          : null;
      const result: ExportIncomeModal = {
          startDate,
          endDate,
          dateEffective
      };
      this.valueDate.emit(result);
  }

  closeModal() {
    this.modalRef.hide();
  }

  ngbDateStructToDate(dateStruct: NgbDateStruct, format = 'MM/yyyy'): string {
    if (dateStruct) {
      const dateStr = this.ngbDateParserFormatter.format(dateStruct);
      return this.datePipe.transform(new Date(dateStr), format);
    }
    return null;
  }

  get isSpecificMonth(): boolean {
    return this.modalType === ModalMonthType.SPECIFIC_MONTH;
  }

  get isSapMode(): boolean {
    return this.modalType === ModalMonthType.SAP_CURRENT_MONTH
        || this.modalType === ModalMonthType.SAP_PREVIOUS_MONTH;
  }

  get submitButtonLabel(): string {
    return this.isSapMode ? 'Export SAP' : 'Export CSV';
  }

  getStartDate(modalType: ModalMonthType, value: NgbDateStruct): string {
      const now = new Date();
      switch (modalType) {
          case ModalMonthType.SPECIFIC_MONTH:
              return this.ngbDateStructToDate(value);
          case ModalMonthType.SAP_CURRENT_MONTH:
              return this.datePipe.transform(now, 'MM/yyyy');
          case ModalMonthType.SAP_PREVIOUS_MONTH: {
              const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
              return this.datePipe.transform(previousMonth, 'MM/yyyy');
          }
          default:
              return null;
      }
  }

  getEndDate(modalType: ModalMonthType, value: NgbDateStruct): string {
      const now = new Date();
      switch (modalType) {
          case ModalMonthType.SPECIFIC_MONTH:
              return this.ngbDateStructToDate(value);
          case ModalMonthType.SAP_CURRENT_MONTH:
              return this.datePipe.transform(now, 'MM/yyyy');
          case ModalMonthType.SAP_PREVIOUS_MONTH: {
              const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
              return this.datePipe.transform(previousMonth, 'MM/yyyy');
          }
          default:
              return null;
      }
  }

  get titleModal(): string {
      switch (this.modalType) {
          case ModalMonthType.SAP_CURRENT_MONTH:
              return 'Export SAP เดือนปัจจุบัน';
          case ModalMonthType.SAP_PREVIOUS_MONTH:
              return 'Export SAP เดือนที่แล้ว';
          case ModalMonthType.SPECIFIC_MONTH:
              return 'Export CSV ระบุเดือน';
          default:
              return 'Export';
      }
  }

}
