import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-export',
  templateUrl: './modal-export.component.html',
  styleUrls: ['./modal-export.component.scss']
})
export class ModalExportComponent implements OnInit {
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }


  exportIncomeByMonth(){
    console.log(this.startDate);
    console.log(this.endDate);
  }

  closeModal() {
    this.modalRef.hide();
  }

}
