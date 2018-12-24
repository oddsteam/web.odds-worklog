import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-product-owner',
  templateUrl: './product-owner.component.html',
  styleUrls: ['./product-owner.component.scss']
})
export class ProductOwnerComponent implements OnInit {
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  customer: string;
  fg: FormGroup;
  constructor(private router: Router,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.onSetupForm();
  }
  onSetupForm() {}

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
  onSubmit() {}
  disableButton() {}
  inputAmount() {}
  goToInvoicePage() {
    this.router.navigate(['customers/invoice']);
  }
}
