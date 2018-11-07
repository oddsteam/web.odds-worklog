import { Component, OnInit } from '@angular/core';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddIncomeModalComponent } from 'src/app/shared/components/add-income-modal/add-income-modal.component';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-add-income-corporate',
  templateUrl: './add-income-corporate.component.html',
  styleUrls: ['./add-income-corporate.component.scss']
})
export class AddIncomeCorporateComponent implements OnInit {
  salary = 0;
  note = 'อยากได้เงินก็กรอกมาสิ';
  recentStatus = 'Add';
  addIncomeResponse: AddIncomeResponse;

  constructor(private modalService: NgbModal,
    private worklogApiService: WorklogApiService,
    public config: NgbModalConfig,
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

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

  openModal() {
    this.modalService.open(AddIncomeModalComponent, { centered: true });
  }
}
