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
  showMessage = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private worklogApiService: WorklogApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.worklogApiService.getCustomerId.subscribe(id => {
      this.customerId = id;
    });
    this.getProductOwnerData();
    this.onSetupForm();
  }

  getProductOwnerData() {
    this.worklogApiService.getProductOwnerResponse(this.customerId).subscribe(res => {
      // console.log(res);
      this.productOwner = res;
    });
  }

  onSetupForm() {
    this.formGroupProductOw = this.fb.group({
      customerId: this.customerId,
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  onAddData() {
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

  onSubmit() {
    if (this.formGroupProductOw.valid) {
      this.worklogApiService.saveProductOwner(this.formGroupProductOw.value).subscribe(data => {
        this.closeModal();
        this.getProductOwnerData();
        this.formGroupProductOw.reset();
        this.showMessage = true;
      });
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
  }

  goToInvoicePage(productOwnerId) {
    this.worklogApiService.setProductOwnerId(productOwnerId);
    this.router.navigate(['customers/invoice']);
  }

  onEditProductOwner() {

  }

  onDeleteProductOwner(id) {
    this.worklogApiService.deleteProductOwner(id).subscribe(data => {
      this.getProductOwnerData();
      this.showMessage = true;
    });
  }
}
