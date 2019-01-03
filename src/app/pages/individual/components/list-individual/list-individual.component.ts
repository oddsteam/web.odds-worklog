import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';
import { StateService } from 'src/app/core/state.service';

@Component({
  selector: 'app-list-individual',
  templateUrl: './list-individual.component.html',
  styleUrls: ['./list-individual.component.scss']
})
export class ListIndividualComponent implements OnInit, OnChanges {

  @Input() role: string;
  @Input() isUpdateList: boolean;
  date = new Date();
  listIncomeIndividual: ListIncomeResponse;

  constructor(
    private worklogApiService: WorklogApiService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.listIncomeIndividual = this.worklogApiService.getIndividualListed();
    if (!this.listIncomeIndividual) {
      this.getListIncomeIndividual();
    }
    this.stateService.listIncomeIndividualTrigger.subscribe(_ => {
      this.getListIncomeIndividual();
    });
  }

  ngOnChanges() {
    if (this.isUpdateList) {
      this.getListIncomeIndividual();
    }
  }

  getListIncomeIndividual() {
    this.worklogApiService.getListIncomeIndividual().subscribe(response => {
      this.listIncomeIndividual = response;
      this.worklogApiService.individualListed = this.listIncomeIndividual;
    });
  }

  exportIndividual() {
    this.worklogApiService.exportDataIndividual().subscribe(
      res => {
        this.downloadFile(res, 'income_individual.csv');
      },
      err => {
        console.log(err);
        alert(`Can't export individual income to CSV file.`);
      }
    );
  }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
