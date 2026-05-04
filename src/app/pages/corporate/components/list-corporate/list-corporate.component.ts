import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { StateService } from "src/app/core/state.service";
import { WorklogApiService } from "src/app/core/worklog-api.service";
import { ModalExportComponent } from "src/app/shared/components/modal-export/modal-export.component";
import { ListIncomeResponse } from "src/app/shared/model/list-income-model-response";
import {RequestExportIncome, RequestExportSAPIncome} from "src/app/shared/model/request-export-income";
import {ExportIncomeModal} from '../../../../shared/model/export-income';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {ModalMonthType} from '../../../../shared/components/modal-export/model';

@Component({
  selector: "app-list-corporate",
  templateUrl: "./list-corporate.component.html",
  styleUrls: ["./list-corporate.component.scss"],
})
export class ListCorporateComponent implements OnInit, OnChanges {
  @Input() role: string;
  @Input() isUpdateList: boolean;
  date = new Date();
  listIncome: ListIncomeResponse;
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
    this.listIncome = this.worklogApiService.getCorporateListed();
    if (!this.listIncome) {
      this.getListIncomeCorporate();
    }
    this.stateService.listIncomeCorporateTrigger.subscribe((_) => {
      this.getListIncomeCorporate();
    });
  }

  ngOnChanges() {
    if (this.isUpdateList) {
      this.getListIncomeCorporate();
    }
  }

  getListIncomeCorporate() {
    this.worklogApiService.getListIncomeCorporate().subscribe((response) => {
      this.listIncome = response;
      this.worklogApiService.corporateListed = this.listIncome;
    });
  }

  exportCsvCurrentMonth() {
    this.worklogApiService.exportDataCorporate('0')
      .pipe(this.handleExportError("Can't export corporate income to CSV file."))
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, "income_corporate.csv");
        }
      });
  }

  exportCsvPreviousMonth() {
    this.worklogApiService.exportDataCorporate('1')
      .pipe(this.handleExportError("Can't export corporate income to CSV file."))
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, "income_corporate_previous.csv");
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
            role: "corporate",
            startDate: data.startDate,
            endDate: data.endDate,
          };

          return this.worklogApiService.exportIncomeByMonth(body).pipe(
            this.handleExportError("Can't export corporate income to CSV file.")
          );
        })
      )
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, "income_corporate_specific_month.csv");
        }
      });
  }

  exportSapCurrentMonth() {
    this.openSapExportModal(ModalMonthType.SAP_CURRENT_MONTH, "income_corporate_SAP.txt");
  }

  exportSapPreviousMonth() {
    this.openSapExportModal(ModalMonthType.SAP_PREVIOUS_MONTH, "income_corporate_SAP_previous.txt");
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
            role: "corporate",
            startDate: data.startDate,
            endDate: data.endDate,
            dateEffective: data.dateEffective,
          };

          return this.worklogApiService.exportSAPIncomeByPeriod(sapReq).pipe(
            this.handleExportError("Can't export corporate SAP income to CSV file.")
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
