import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';

@Component({
  selector: 'app-add-income-corporate',
  templateUrl: './add-income-corporate.component.html',
  styleUrls: ['./add-income-corporate.component.scss']
})

export class AddIncomeCorporateComponent implements OnInit {
  salary = 0;
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  note = 'อยากได้เงินก็กรอกมาสิ';
  recentStatus = 'Add';
  addIncomeResponse: AddIncomeResponse;

  constructor(
    private modalService: BsModalService,
    private worklogApiService: WorklogApiService,
  ) { }

  ngOnInit() {
    this.worklogApiService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished().subscribe(() => this.checkStatusUser());
  }

  checkStatusUser() {
    this.worklogApiService.getIncomeByUserID().subscribe(res => {
      this.addIncomeResponse = res;
      this.updateData(this.addIncomeResponse);
    });
  }

  updateData(data) {
    this.recentStatus = 'Edit';
    this.salary = data.totalIncome;
    this.note = data.note;
  }

  openTemplateModal() {
    this.openModal(this.templateModal);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { ignoreBackdropClick: true, })
    );
  }

  closeModalEvent(event) {
    if (event) {
      this.closeModal();
    }
  }

  closeModal() {
    this.modalRef.hide();
  }

}
