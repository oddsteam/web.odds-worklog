import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';

@Component({
  selector: 'app-list-individual',
  templateUrl: './list-individual.component.html',
  styleUrls: ['./list-individual.component.scss']
})
export class ListIndividualComponent implements OnInit {
  listIncome: ListIncomeResponse;
  date = new Date();

  constructor(
    private worklogApiService: WorklogApiService
  ) { }

  ngOnInit() {
    this.worklogApiService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished().subscribe(() => this.getListIncomeIndividual());
  }

  getListIncomeIndividual() {
    this.worklogApiService.getListIncomeIndividual().subscribe(response => {
      this.listIncome = response;
    });
  }

  exportIndividual() {
    this.worklogApiService.exportDataIndividual().subscribe(
      res => {
        this.downloadFile(res, 'income_individual.csv');
      },
      err => {
        console.log(err);
        alert(`Can't export corporate income to CSV file.`);
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
