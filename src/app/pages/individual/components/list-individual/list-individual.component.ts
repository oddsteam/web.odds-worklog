import { Component, Input, OnChanges, OnInit } from "@angular/core";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import { StateService } from "src/app/core/state.service";
import { WorklogApiService } from "src/app/core/worklog-api.service";
import { ModalExportComponent } from "src/app/shared/components/modal-export/modal-export.component";
import { ListIncomeResponse } from "src/app/shared/model/list-income-model-response";
import {RequestExportIncome, RequestExportSAPIncome} from "src/app/shared/model/request-export-income";
import {ModalMonthType} from '../../../../shared/components/modal-export/model';
import {catchError, switchMap} from 'rxjs/operators';
import {ExportIncomeModal} from '../../../../shared/model/export-income';
import {of} from 'rxjs';

@Component({
  selector: "app-list-individual",
  templateUrl: "./list-individual.component.html",
  styleUrls: ["./list-individual.component.scss"],
})
export class ListIndividualComponent implements OnInit, OnChanges {
  @Input() role: string;
  @Input() isUpdateList: boolean;
  date = new Date();
  listIncomeIndividual: ListIncomeResponse;
  modalRef: BsModalRef;

  /** Income export is restricted to full admins (not user-admin). */
  get showIncomeExport(): boolean {
    return this.role === "admin";
  }

  constructor(
    private worklogApiService: WorklogApiService,
    private stateService: StateService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.listIncomeIndividual = this.worklogApiService.getIndividualListed();
    if (!this.listIncomeIndividual) {
      this.getListIncomeIndividual();
    }
    this.stateService.listIncomeIndividualTrigger.subscribe((_) => {
      this.getListIncomeIndividual();
    });
  }

  ngOnChanges() {
    if (this.isUpdateList) {
      this.getListIncomeIndividual();
    }
  }

  getListIncomeIndividual() {
    this.worklogApiService.getListIncomeIndividual().subscribe((response) => {
      this.listIncomeIndividual = response;
      this.worklogApiService.individualListed = this.listIncomeIndividual;
    });
  }

  exportCsvCurrentMonth() {
    this.worklogApiService.exportDataIndividual('0')
      .pipe(this.handleExportError("Can't export individual income to CSV file."))
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, "income_individual.csv");
        }
      });
  }

  exportCsvPreviousMonth() {
    this.worklogApiService.exportDataIndividual('1')
      .pipe(this.handleExportError("Can't export individual income to CSV file."))
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, "income_individual_previous.csv");
        }
      });
  }

  exportCsvByMonth() {
    const initialState: ModalOptions = {
      initialState: {
        modalType: ModalMonthType.SPECIFIC_MONTH
      }
    };
    this.modalRef = this.modalService.show(
      ModalExportComponent,
      initialState
    );

    this.modalRef.content.valueDate
      .pipe(
        switchMap((data: ExportIncomeModal) => {
          const body: RequestExportIncome = {
            role: "individual",
            startDate: data.startDate,
            endDate: data.endDate,
          };

          return this.worklogApiService.exportIncomeByMonth(body).pipe(
            this.handleExportError("Can't export individual income to CSV file.")
          );
        })
      )
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, "income_individual_specific_month.csv");
        }
      });
  }

  exportCsvIncomeFromTimesheetCurrentMonth() {
    this.worklogApiService.exportDataIncomeFromTimesheetIndividual('0')
      .pipe(this.handleExportError("Can't export income from timesheet to CSV file."))
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, "income_from_timesheet_individual.csv");
        }
      });
  }

  exportSapCurrentMonth() {
    this.openSapExportModal(ModalMonthType.SAP_CURRENT_MONTH, "income_individual_SAP.txt");
  }

  exportSapPreviousMonth() {
    this.openSapExportModal(ModalMonthType.SAP_PREVIOUS_MONTH, "income_individual_SAP_previous.txt");
  }

  private openSapExportModal(modalType: ModalMonthType, filename: string) {
    const initialState: ModalOptions = {
      initialState: {
        modalType
      }
    };
    this.modalRef = this.modalService.show(
      ModalExportComponent,
      initialState
    );

    this.modalRef.content.valueDate
      .pipe(
        switchMap((data: ExportIncomeModal) => {
          const sapReq: RequestExportSAPIncome = {
            role: "individual",
            startDate: data.startDate,
            endDate: data.endDate,
            dateEffective: data.dateEffective,
          };

          return this.worklogApiService.exportSAPIncomeByPeriod(sapReq).pipe(
            this.handleExportError("Can't export individual SAP income to CSV file.")
          );
        })
      )
      .subscribe((sapIncome) => {
        if (sapIncome) {
          this.downloadFile(sapIncome, filename);
        }
      });
  }

  private handleExportError(message: string) {
    return catchError((err) => {
        console.error(message, err);
        alert(message);
        return of(null);
    });
 }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display: none");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
