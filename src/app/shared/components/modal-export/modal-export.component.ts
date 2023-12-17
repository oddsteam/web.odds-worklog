import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-export',
  templateUrl: './modal-export.component.html',
  styleUrls: ['./modal-export.component.scss']
})
export class ModalExportComponent implements OnInit {
  form: FormGroup;
  @Output() valueDate = new EventEmitter();

  constructor(
    private modalRef: BsModalRef,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date())
    });
  }


  exportIncomeByMonth() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.ngbDateStructToDate(this.form.controls.startDate.value), this.ngbDateStructToDate(this.form.controls.endDate.value));

    const startDate = this.ngbDateStructToDate(this.form.controls.startDate.value);
    const endDate = this.ngbDateStructToDate(this.form.controls.endDate.value);

    this.valueDate.emit({ startDate, endDate });
  }

  closeModal() {
    this.modalRef.hide();
  }

  ngbDateStructToDate(dateStruct: NgbDateStruct): string {
    if (dateStruct) {
      const dateStr = this.ngbDateParserFormatter.format(dateStruct);
      return this.datePipe.transform(new Date(dateStr), 'MM/yyyy');;
    }
    return null;
  }


}
