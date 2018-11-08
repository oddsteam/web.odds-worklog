import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddIncomeResponse } from '../../model/add-income-model-response';

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.onSetupForm();
  }

  isVat() {
    return true;
  }

  onSetupForm() {
    if (this.addIncomeData === null) {
      this.fg = this.fb.group({
        totalIncomeController: ['', Validators.required],
        noteController: ['', Validators.required]
      });
    } else {
      this.fg = this.fb.group({
        totalIncomeController: [this.addIncomeData.totalIncome, Validators.required],
        noteController: [this.addIncomeData.note, Validators.required]
      });
    }
  }

  onSubmit() {
    this.addIncomeAlready = true;
    const { totalIncomeController, noteController } = this.fg.getRawValue();
  }

  onCancel() {
    this.addIncomeAlready = false;
  }

  closeModal() {
    this.closeModalEmit.emit(true);
  }

  onConfirm() {
    this.closeModalEmit.emit(true);
  }

  onDisableButton() {

  }

  // title = 'Add Income';
  // totalIncomeController: FormControl = new FormControl();
  // noteController: FormControl = new FormControl();

  // constructor(
  //     public activeModal: NgbActiveModal,
  //     public config: NgbModalConfig,
  //     private modalService: NgbModal,
  // ) {
  //     config.backdrop = 'static';
  //     config.keyboard = false;
  // }

  // ngOnInit() {}

  // submit() {
  //     this.modalService.open(ConfirmIncomeModalComponent, { centered: true });
  //     setTimeout(() => { this.activeModal.close(); });
  // }

  // disableButton() {
  //     if (this.totalIncomeController.value != null) {
  //         return false;
  //     } else {
  //         return true;
  //     }
  // }

}
