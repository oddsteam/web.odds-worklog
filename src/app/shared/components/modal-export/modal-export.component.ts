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

  constructor(
    private modalRef: BsModalRef,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date())
    });
  }


  exportIncomeByMonth() {
    console.log(this.form.controls.startDate.value);
    console.log(this.ngbDateStructToDate(this.form.controls.startDate.value));
    console.log(this.ngbDateStructToDate(this.form.controls.endDate.value));
  }

  closeModal() {
    this.modalRef.hide();
  }

  ngbDateStructToDate(dateStruct: NgbDateStruct): string {
    if (dateStruct) {
      return this.ngbDateParserFormatter.format(dateStruct);
    }
    return null;
  }


}
