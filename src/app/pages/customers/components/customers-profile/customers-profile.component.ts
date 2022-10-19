import { Component, OnInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { Customers } from 'src/app/shared/model/customers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customers-profile',
  templateUrl: './customers-profile.component.html',
  styleUrls: ['./customers-profile.component.scss']
})
export class CustomersProfileComponent implements OnInit {
  @ViewChild('templateModal', { static: true }) templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  customers: Customers[];
  showMessage = false;
  updateFlag = false;
  formGroupCustomer: FormGroup;
  customerId: string;

  constructor(
    private router: Router,
    private worklogApiService: WorklogApiService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getCustomerData();
    this.onSetupDataForm();
  }

  getCustomerData() {
    this.worklogApiService.getCustomerResponse().subscribe(res => {
      this.customers = res;
    });
  }

  onSetupDataForm() {
    this.formGroupCustomer = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onAddCustomer() {
    this.updateFlag = false;
    this.openModal(this.templateModal);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { ignoreBackdropClick: true, })
    );
  }

  onSubmit() {
    if (this.formGroupCustomer.valid) {
      this.worklogApiService.saveCustomerProfile(this.formGroupCustomer.value).subscribe(data => {
        this.closeModal();
        this.getCustomerData();
        this.formGroupCustomer.reset();
        this.showMessage = true;
      });
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
  }

  onUpdate() {
    if (this.formGroupCustomer.valid) {
      this.worklogApiService.updateCustomerById(this.customerId, this.formGroupCustomer.value).subscribe(response => {
        this.closeModal();
        this.getCustomerData();
        this.formGroupCustomer.reset();
        this.showMessage = true;
      }, err => console.log(err));
    } else {
      alert('กรุณากรอกข้อมมูลให้ครบถ้วน');
    }
  }

  closeModal() {
    this.modalRef.hide();
    this.formGroupCustomer.reset();
  }

  goToProductOwnerPage(customerId) {
    this.worklogApiService.setCustomerId(customerId);
    this.router.navigate(['customers/product-owner']);
  }

  onEditCustomer(customerId) {
    this.customerId = customerId;
    this.updateFlag = true;
    this.worklogApiService.getCustomerById(customerId).subscribe(response => {
      this.formGroupCustomer.setValue({
        name: response['name'],
        address: response['address']
      });
    });
    this.openModal(this.templateModal);
  }

  onDeleteCustomer(id) {
    this.worklogApiService.deleteCustomer(id).subscribe(res => {
      this.getCustomerData();
      this.showMessage = true;
    });
  }
}
