import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ModalExportComponent } from 'src/app/shared/components/modal-export/modal-export.component';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';
import { RequestExportIncome } from 'src/app/shared/model/request-export-income';

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
  modalRef: BsModalRef;

  constructor(
    private worklogApiService: WorklogApiService,
    private stateService: StateService,
    private modalService: BsModalService,
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

  exportCorporate(beforeMonth: string) {
    this.worklogApiService.exportDataCorporate(beforeMonth).subscribe({
      next: res => {
        this.downloadFile(res, 'income_corporate.csv');
      },
      error: err => {
        console.log(err);
        alert(`Can't export corporate income to CSV file.`);
      }
    });
  }

  exportDifferentCorporate() {
    this.worklogApiService.exportDataDifferentCorporate().subscribe(res => {
      this.downloadFile(res, 'income_different_corporate.csv');
    },
      err => {
        console.log(err);
        alert(`Can't export different corporate income to CSV file.`);
      });

  }

  exportByMonth() {
    this.modalRef = this.modalService.show(ModalExportComponent,
      Object.assign({}, {})
    );

    this.modalRef.content.valueDate.subscribe((data) => {
      console.log('Received data from modal:', data);
      const body: RequestExportIncome = {
        role: 'corporate',
        startDate: data.startDate,
        endDate: data.startDate,
      };
      this.worklogApiService.exportIncomeByMonth(body).subscribe((res) => {
        this.downloadFile(res, 'income_corporate_specific_month.csv');
      }, err => {
        console.log(err);
        alert(`Can't export corporate income to CSV file.`);
      });
    });
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
