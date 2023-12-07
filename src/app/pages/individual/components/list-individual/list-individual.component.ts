import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ModalExportComponent } from 'src/app/shared/components/modal-export/modal-export.component';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';

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
  modalRef: BsModalRef;

  constructor(
    private worklogApiService: WorklogApiService,
    private stateService: StateService,
    private modalService: BsModalService,
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

  exportIndividual(beforeMonth: string) {
    this.worklogApiService.exportDataIndividual(beforeMonth).subscribe(
      res => {
        this.downloadFile(res, 'income_individual.csv');
      },
      err => {
        console.log(err);
        alert(`Can't export individual income to CSV file.`);
      }
    );
  }

  exportDifferentIndividuals() {
    this.worklogApiService.exportDataDifferentIndividuals().subscribe(res => {
      this.downloadFile(res, 'income_individual_different.csv');
    }, error => {
      alert('Cant export different individuals income to CSV file.');
    });
  }

  exportByMonth() {
    this.modalRef = this.modalService.show(ModalExportComponent,
      Object.assign({}, {})
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
