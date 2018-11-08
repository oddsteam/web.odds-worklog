import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { StateService } from 'src/app/core/state.service';

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
  userFlag: string;
  addIncomeResponse: AddIncomeResponse;

  constructor(
    private modalService: BsModalService,
    private worklogApiService: WorklogApiService,
    private  stateService: StateService
  ) { }

  ngOnInit() {
    this.worklogApiService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished().subscribe(() => this.checkStatusUser());
    this.stateService.isUserFlag.subscribe(flag => {
        this.userFlag = flag;
    });
  }

  checkStatusUser() {
    this.worklogApiService.getIncomeByUserID().subscribe(res => {
      this.addIncomeResponse = res;
      this.salary = Number(res.totalIncome);
      this.note = res.note;
    });
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
