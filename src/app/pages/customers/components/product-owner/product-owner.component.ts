import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ProductOwner } from 'src/app/shared/model/product-owner';
import { NumberUtil } from 'src/app/shared/utils/number.util';

@Component({
  selector: 'app-product-owner',
  templateUrl: './product-owner.component.html',
  styleUrls: ['./product-owner.component.scss']
})
export class ProductOwnerComponent implements OnInit {

  @ViewChild('templateModal', { static: true }) templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  customerId: string;
  formGroupProductOw: FormGroup;
  productOwner: ProductOwner[];
  poId: string;
  updateFlag = false;
  showMessage = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private worklogApiService: WorklogApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getCustomerId();
    this.getProductOwnerData();
    this.onSetupForm();
  }

  getCustomerId() {
    this.worklogApiService.getCustomerId.subscribe(id => {
      this.customerId = id;
    });
  }

  getProductOwnerData() {
    this.worklogApiService.getProductOwnerResponse(this.customerId).subscribe(res => {
      this.productOwner = res;
    });
  }

  onSetupForm() {
    this.formGroupProductOw = this.fb.group({
      customerId: [this.customerId],
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.onKeyAmount();
  }

  onAddData() {
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
    this.formGroupProductOw.reset({
      customerId: this.customerId,
      name: '',
      amount: '',
    });
  }

  onSubmit() {
    if (this.formGroupProductOw.valid) {
      const body = {
        customerId: this.customerId,
        name: this.formGroupProductOw.get('name').value,
        amount: this.formGroupProductOw.get('amount').value.replace(/,/g, '')
      };
      this.worklogApiService.saveProductOwner(body).subscribe(data => {
        this.closeModal();
        this.getProductOwnerData();
        this.formGroupProductOw.reset();
        this.showMessage = true;
      }, err => alert(err.error.message));
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
  }

  onUpdate() {
    if (this.formGroupProductOw.valid) {
      const po: ProductOwner = this.formGroupProductOw.value;
      po.amount = this.formatInteger(po.amount);
      this.worklogApiService.updateProductOwner(this.poId, po).subscribe(response => {
        this.closeModal();
        this.getProductOwnerData();
        this.formGroupProductOw.reset();
        this.showMessage = true;
      }, err => alert(err.error.message));
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
  }

  goToInvoicePage(productOwnerId) {
    this.worklogApiService.setProductOwnerId(productOwnerId);
    this.router.navigate(['customers/invoice']);
  }

  onEditProductOwner(poId) {
    this.poId = poId;
    this.updateFlag = true;
    this.worklogApiService.getProductOwnerById(poId).subscribe(response => {
      this.formGroupProductOw.setValue({
        customerId: response['customerId'],
        name: response['name'],
        amount: this.formatCurrency(response['amount'])
      });
    });
    this.openModal(this.templateModal);
  }

  onDeleteProductOwner(id) {
    this.worklogApiService.deleteProductOwner(id).subscribe(data => {
      this.getProductOwnerData();
      this.showMessage = true;
    }, err => alert(err.error.message));
  }

  onKeyAmount() {
    const amount = this.amountValue.value;
    const numberAmount = this.formatInteger(amount);
    const realFormat = this.formatCurrency(numberAmount);
    this.amountValue.setValue(realFormat);
  }

  formatInteger(amount: string): string {
    return NumberUtil.formatInteger(amount);
  }

  formatCurrency(amount: string): string {
    return NumberUtil.formatCurrency(amount);
  }

  get amountValue(): AbstractControl {
    return this.formGroupProductOw.get('amount');
  }

}
