import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';

@Component({
  selector: 'app-list-corporate',
  templateUrl: './list-corporate.component.html',
  styleUrls: ['./list-corporate.component.scss'],
})
export class ListCorporateComponent implements OnInit {
  date = new Date();
  listIncome: ListIncomeResponse;
  constructor(private worklogService: WorklogApiService) {}

  ngOnInit() {
    this.worklogService.getListIncomeCorporate().subscribe(response => {
      this.listIncome = response;
    });
  }

  exportCorporate() {
    this.worklogService.exportDataCorporate().subscribe(
      res => {
        this.downloadFile(res, 'income_corporate.csv');
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
