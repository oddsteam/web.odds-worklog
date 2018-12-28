import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ProductOwner } from 'src/app/shared/model/product-owner';

@Component({
  selector: 'app-product-owner',
  templateUrl: './product-owner.component.html',
  styleUrls: ['./product-owner.component.scss']
})
export class ProductOwnerComponent implements OnInit {

  @ViewChild('templateModal') templateModal: TemplateRef<any>;
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
        name: this.formGroupProductOw.get('name').value
      };
      this.worklogApiService.saveProductOwner(body).subscribe(data => {
        this.closeModal();
        this.getProductOwnerData();
        this.formGroupProductOw.reset();
        this.showMessage = true;
      });
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
  }

  onUpdate() {
    if (this.formGroupProductOw.valid) {
      this.worklogApiService.updateProductOwner(this.poId, this.formGroupProductOw.value).subscribe(response => {
        this.closeModal();
        this.getProductOwnerData();
        this.formGroupProductOw.reset();
        this.showMessage = true;
      }, err => console.log(err));
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
        amount: '100000'
      });
    });
    this.openModal(this.templateModal);
  }

  onDeleteProductOwner(id) {
    this.worklogApiService.deleteProductOwner(id).subscribe(data => {
      this.getProductOwnerData();
      this.showMessage = true;
    });
  }
}
