import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-income-modal',
  templateUrl: './confirm-income-modal.component.html',
  styleUrls: ['./confirm-income-modal.component.scss']
})
export class ConfirmIncomeModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onCancelPress() {
    this.activeModal.close();
  }
  onConfirmPress() {
    this.activeModal.close();
  }
}
