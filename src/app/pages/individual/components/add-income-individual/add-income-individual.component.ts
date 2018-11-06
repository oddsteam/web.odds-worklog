import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { AddIncomeModalComponent } from 'src/app/shared/components/add-income-modal/add-income-modal.component';

@Component({
  selector: 'app-add-income-individual',
  templateUrl: './add-income-individual.component.html',
  styleUrls: ['./add-income-individual.component.scss']
})
export class AddIncomeIndividualComponent implements OnInit {
  salary = '0';
  note = 'อยากได้เงินก็กรอกมาสิ';
  nameButton = 'Add Income';
  styleButton = 'btn btn-blue';
  addIncomeResponse: AddIncomeResponse;

  constructor(
    private modalService: NgbModal,
    private worklogApiService: WorklogApiService
  ) { }

  ngOnInit() {
    this.checkStatusUser();
  }

  changeStyleButton(): string {
    return this.styleButton;
  }

  openModal() {
    const modal = this.modalService.open(AddIncomeModalComponent, { centered: true });
    modal.componentInstance.addIncome = this.getData(this.addIncomeResponse);
  }

  checkStatusUser() {
    this.worklogApiService.getIncomeByUserID().subscribe(res => {
      if (res) {
        this.addIncomeResponse = res;
        this.updateData(this.addIncomeResponse);
      }
    });
  }

  updateData(data) {
    this.styleButton = 'btn btn-red';
    this.nameButton = 'Edit Income';
    this.salary = data.totalIncome;
    this.note = data.note;
  }

  getData(res) {
    return {
      totalIncome: res.totalIncome,
      note: res.note
    };
  }

}
