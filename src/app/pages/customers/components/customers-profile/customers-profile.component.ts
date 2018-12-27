import { Component, OnInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { Customers } from 'src/app/shared/model/customers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-customers-profile',
  templateUrl: './customers-profile.component.html',
  styleUrls: ['./customers-profile.component.scss']
})
export class CustomersProfileComponent implements OnInit {
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  customers: Customers[];
  showMessage = false;
  formGroupCustomer: FormGroup;

  constructor(
    private router: Router,
    private worklogApiService: WorklogApiService,
    private modalService: BsModalService,
    private fb: FormBuilder) { }

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

  closeModal() {
    this.modalRef.hide();
  }

  goToProductOwnerPage(customerId) {
    this.worklogApiService.setCustomerId(customerId);
    this.router.navigate(['customers/productOwner']);
  }

  onEditCustomer() {

  }

  onDeleteCustomer(id) {
    this.worklogApiService.deleteCustomer(id).subscribe(res => {
      this.getCustomerData();
      this.showMessage = true;
    });
  }
}
