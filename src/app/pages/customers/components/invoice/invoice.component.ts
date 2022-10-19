import { NumberUtil } from 'src/app/shared/utils/number.util';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { InvoiceModel } from 'src/app/shared/model/invoice-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InvoiceService } from 'src/app/core/invoice.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('templateModal', { static: true }) templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  invoiceData: InvoiceModel[];
  showMessage: Boolean = false;
  updateFlag: Boolean = false;
  poId: string;
  invoiceNo: string;
  invoiceId: string;
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
      if (response.length === 0) {
        this.getInvoiceNumber();
      }
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
        amount: this.fg.get('amount').value.replace(/,/g, '')
      };
      this.invoiceService.createNewInvoice(body).subscribe(data => {
        this.closeModal();
        this.onReset();
      }, err => alert(err.error.message));
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
  }

  onUpdate() {
    if (this.fg.valid) {
      const invoice = this.fg.value;
      invoice.amount = NumberUtil.formatInteger(invoice.amount);
      this.invoiceService.updateInvoice(this.invoiceId, invoice).subscribe(response => {
        this.closeModal();
        this.getInvoiceData();
        this.showMessage = true;
        this.updateFlag = false;
        this.fg.reset({
          poId: this.poId,
          invoiceNo: this.invoiceNo,
          amount: ''
        });
      }, err => alert(err.error.message));
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
    this.updateFlag = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { ignoreBackdropClick: true, })
    );
  }

  closeModal() {
    this.modalRef.hide();
    this.fg.reset({
      poId: this.poId,
      invoiceNo: this.invoiceNo,
      amount: '',
    });
  }

  onEditInvoice(invoiceId) {
    this.invoiceId = invoiceId;
    this.updateFlag = true;
    this.invoiceService.getInvoiceById(invoiceId).subscribe(response => {
      this.fg.setValue({
        poId: response['poId'],
        invoiceNo: response['invoiceNo'],
        amount: this.formatCurrency(response['amount'])
      });
    });
    this.openModal(this.templateModal);
  }

  onDeleteInvoice(invoiceId) {
    this.invoiceService.deleteInvoice(invoiceId).subscribe(response => {
      this.getInvoiceData();
      this.showMessage = true;
    }, err => alert(err.error.message));
  }

  formatCurrency(amount: string): string {
    return NumberUtil.formatCurrency(amount);
  }

}
