import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { IncomeFlag } from 'src/app/shared/model/income-flag';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {
  id = sessionStorage.getItem('idUser');
  salary = 0;
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  modalRef: BsModalRef;
  note = 'อยากได้เงินก็กรอกมาสิ';
  typeUser = 'individual';
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
    this.worklogApiService.getIncomeByUserID(this.id).subscribe(res => {
      if (res === null) {
        this.setDefault();
      } else {
        IncomeFlag.id = res.id;
        this.addIncomeResponse = res;
        this.salary = Number(res.netIncome);
        this.note = res.note;
        this.stateService.setFlagUser('N');
      }
    }, error => {
      this.setDefault();
    });

  }

  setDefault() {
    IncomeFlag.isUpdate = false;
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
