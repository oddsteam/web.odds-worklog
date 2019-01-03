import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';

@Component({
  selector: 'app-list-corporate',
  templateUrl: './list-corporate.component.html',
  styleUrls: ['./list-corporate.component.scss'],
})
export class ListCorporateComponent implements OnInit, OnChanges {

  @Input() role: string;
  @Input() isUpdateList: boolean;
  date = new Date();
  listIncome: ListIncomeResponse;

  constructor(
    private worklogApiService: WorklogApiService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.listIncome = this.worklogApiService.getCorporateListed();
    if (!this.listIncome) {
      this.getListIncomeCorporate();
    }
    this.stateService.listIncomeCorporateTrigger.subscribe(_ => {
      this.getListIncomeCorporate();
    });
  }

  ngOnChanges() {
    if (this.isUpdateList) {
      this.getListIncomeCorporate();
    }
  }

  getListIncomeCorporate() {
    this.worklogApiService.getListIncomeCorporate().subscribe(response => {
      this.listIncome = response;
      this.worklogApiService.corporateListed = this.listIncome;
    });
  }

  exportCorporate() {
    this.worklogApiService.exportDataCorporate().subscribe(
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
