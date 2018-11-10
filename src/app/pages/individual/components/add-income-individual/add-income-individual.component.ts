import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { StateService } from 'src/app/core/state.service';
import { IncomeFlag } from 'src/app/shared/model/income-flag';

@Component({
  selector: 'app-add-income-individual',
  templateUrl: './add-income-individual.component.html',
  styleUrls: ['./add-income-individual.component.scss']
})
export class AddIncomeIndividualComponent implements OnInit {
  salary = 0;
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  note = 'อยากได้เงินก็กรอกมาสิ';
  userFlag: string;
  addIncomeResponse: AddIncomeResponse;

  constructor(
    private modalService: BsModalService,
    private worklogApiService: WorklogApiService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.worklogApiService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished().subscribe(() => this.checkStatusUser());
    this.stateService.isUserFlag.subscribe(flag => {
      this.userFlag = flag;
    });
  }

  checkStatusUser() {
    this.worklogApiService.getIncomeByUserID().subscribe(res => {
      if (res === null) {
        this.setDefault();
      } else {
        IncomeFlag.id = res.id;
        this.addIncomeResponse = res;
        this.salary = Number(res.totalIncome);
        this.note = res.note;
      }
    }, error => {
      this.setDefault();
    });
  }

  setDefault() {
    IncomeFlag.isUpdate = false;
    this.userFlag = 'N';
    IncomeFlag.id = '';
    this.addIncomeResponse = null;
    this.salary = 0;
    this.note = '';
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
      this.ngOnInit();
    }
  }

  closeModal() {
    this.modalRef.hide();
  }

}
