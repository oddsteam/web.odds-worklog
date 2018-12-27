import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { InvoiceModel } from 'src/app/shared/model/invoice-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { InvoiceService } from 'src/app/core/invoice.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  invoiceData: InvoiceModel[];
  showMessage: Boolean = false;
  poId: string;
  invoiceNo: string;
  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private invoiceService: InvoiceService,
    private worklogService: WorklogApiService
  ) { }

  ngOnInit() {
    this.getProductOwnerId();
    this.getInvoiceData();
    this.setupForm();
    this.getInvoiceNumber();
  }

  getProductOwnerId() {
    this.worklogService.getProductOwnerId.subscribe(id => {
      this.poId = id;
    }, err => console.log(err));
  }

  getInvoiceNumber() {
    this.invoiceService.getNextInvoiceNumber(this.poId).subscribe(response => {
      this.invoiceNo = response.invoiceNo;
      this.fg.get('invoiceNo').setValue(response.invoiceNo);
    }, err => console.log(err));
  }

  getInvoiceData() {
    this.invoiceService.getInvoiceListPoById(this.poId).subscribe(response => {
      this.invoiceData = response;
    }, err => console.log(err));
  }

  setupForm() {
    this.fg = this.fb.group({
      poId: this.poId,
      invoiceNo: this.invoiceNo,
      amount: ['', Validators.required]
    });
    this.fg.get('invoiceNo').disable();
  }

  onSubmit() {
    if (this.fg.valid) {
      const body = {
        poId: this.poId,
        invoiceNo: this.invoiceNo,
        amount: this.fg.get('amount').value
      };
      this.invoiceService.createNewInvoice(body).subscribe(data => {
        this.closeModal();
        this.onReset();
      }, err => console.log(err));
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
  }

  onReset() {
    this.getInvoiceData();
    this.getInvoiceNumber();
    this.showMessage = true;
    this.fg.reset({
      poId: this.poId,
      invoiceNo: this.invoiceNo,
      amount: ''
    });
  }

  onAdd() {
    this.openModal(this.templateModal);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { ignoreBackdropClick: true, })
    );
  }

  closeModal() {
    this.modalRef.hide();
  }

  onEditInvoice(invoiceId) {

  }

  onDeleteInvoice(invoiceId) {
    this.invoiceService.deleteInvoice(invoiceId).subscribe(response => {
      this.getInvoiceData();
      this.showMessage = true;
    }, err => console.log(err));
  }

}
