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
  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private invoiceService: InvoiceService,
    private worklogService: WorklogApiService
  ) { }

  ngOnInit() {
    this.setupForm();
    this.getProductOwnerId();
    this.getInvoiceData();
  }

  setupForm() {
    this.fg = this.fb.group({
      invoiceNo: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  getProductOwnerId() {
    this.worklogService.getProductOwnerId.subscribe(id => {
      this.poId = id;
    });
  }

  getInvoiceData() {
    this.invoiceService.getInvoiceById(this.poId).subscribe(response => {
      this.invoiceData = response[0];
    });
  }

  onSubmit() {
    if (this.fg.valid) {
      this.invoiceService.createNewInvoice(this.fg.value).subscribe(data => {
        this.closeModal();
        this.getInvoiceData();
        this.fg.reset();
        this.showMessage = true;
      });
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
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
    });
  }

}
