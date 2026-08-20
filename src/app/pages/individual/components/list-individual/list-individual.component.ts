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

  /** When on, the CSV exports read from income_from_timesheet instead of income. */
  useTimesheetSource = false;

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
    this.exportCsvByMonthIndex('0', "");
  }

  exportCsvPreviousMonth() {
    this.exportCsvByMonthIndex('1', "_previous");
  }

  private exportCsvByMonthIndex(monthIndex: string, filenameSuffix: string) {
    const request$ = this.useTimesheetSource
      ? this.worklogApiService.exportDataIncomeFromTimesheetIndividual(monthIndex)
      : this.worklogApiService.exportDataIndividual(monthIndex);

    request$
      .pipe(this.handleExportError(this.csvExportErrorMessage()))
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, this.csvFilename(filenameSuffix));
        }
      });
  }

  /** Downloaded files are named after the source the toggle selected, so the two never mix up. */
  private get filenamePrefix(): string {
    return this.useTimesheetSource
      ? "income_from_timesheet_individual"
      : "income_individual";
  }

  private csvFilename(suffix: string): string {
    return `${this.filenamePrefix}${suffix}.csv`;
  }

  private csvExportErrorMessage(): string {
    return this.useTimesheetSource
      ? "Can't export income from timesheet to CSV file."
      : "Can't export individual income to CSV file.";
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

          const request$ = this.useTimesheetSource
            ? this.worklogApiService.exportIncomeFromTimesheetByMonth(body)
            : this.worklogApiService.exportIncomeByMonth(body);

          return request$.pipe(
            this.handleExportError(this.csvExportErrorMessage())
          );
        })
      )
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, this.csvFilename("_specific_month"));
        }
      });
  }

  exportPeakCurrentMonth() {
    this.exportPeakByMonthIndex('0');
  }

  exportPeakPreviousMonth() {
    this.exportPeakByMonthIndex('1');
  }

  private exportPeakByMonthIndex(monthIndex: string) {
    const request$ = this.useTimesheetSource
      ? this.worklogApiService.exportPeakIncomeFromTimesheetIndividual(monthIndex)
      : this.worklogApiService.exportPeakIndividual(monthIndex);

    request$
      .pipe(this.handleExportError(this.peakExportErrorMessage()))
      .subscribe((income) => {
        if (income) {
          this.downloadFile(income, this.peakFilenameForMonthIndex(monthIndex));
        }
      });
  }

  private peakExportErrorMessage(): string {
    return this.useTimesheetSource
      ? "Can't export income from timesheet to PEAK file."
      : "Can't export individual income to PEAK file.";
  }

  private sapExportErrorMessage(): string {
    return this.useTimesheetSource
      ? "Can't export income from timesheet SAP to CSV file."
      : "Can't export individual SAP income to CSV file.";
  }

  exportPeakByMonth() {
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

          const request$ = this.useTimesheetSource
            ? this.worklogApiService.exportPeakIncomeFromTimesheetByMonth(body)
            : this.worklogApiService.exportPeakByMonth(body);

          return request$.pipe(
            this.handleExportError(this.peakExportErrorMessage()),
            switchMap((income) => of({ income, startDate: data.startDate }))
          );
        })
      )
      .subscribe((result) => {
        if (result && result.income) {
          this.downloadFile(result.income, this.peakFilenameForStartDate(result.startDate));
        }
      });
  }

  exportSapCurrentMonth() {
    this.openSapExportModal(ModalMonthType.SAP_CURRENT_MONTH, "");
  }

  exportSapPreviousMonth() {
    this.openSapExportModal(ModalMonthType.SAP_PREVIOUS_MONTH, "_previous");
  }

  private sapFilename(suffix: string): string {
    return `${this.filenamePrefix}_SAP${suffix}.txt`;
  }

  private openSapExportModal(modalType: ModalMonthType, filenameSuffix: string) {
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

          const request$ = this.useTimesheetSource
            ? this.worklogApiService.exportSAPIncomeFromTimesheetByPeriod(sapReq)
            : this.worklogApiService.exportSAPIncomeByPeriod(sapReq);

          return request$.pipe(
            this.handleExportError(this.sapExportErrorMessage())
          );
        })
      )
      .subscribe((sapIncome) => {
        if (sapIncome) {
          this.downloadFile(sapIncome, this.sapFilename(filenameSuffix));
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

  peakFilenameForMonthIndex(monthIndex: string): string {
    const now = new Date();
    const date = monthIndex === '0'
      ? now
      : new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return this.peakFilename(date);
  }

  peakFilenameForStartDate(startDate: string): string {
    const [month, year] = (startDate || '').split('/');
    const parsed = new Date(Number(year), Number(month) - 1, 1);
    if (isNaN(parsed.getTime())) {
      return this.peakFilename(new Date());
    }
    return this.peakFilename(parsed);
  }

  private peakFilename(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const source = this.useTimesheetSource ? 'INDI_TIMESHEET' : 'INDI';
    return `PEAK_ImportExpense_${source}_${month}.${date.getFullYear()}.csv`;
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
