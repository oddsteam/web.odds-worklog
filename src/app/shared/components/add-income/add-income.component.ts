import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { StateService } from "src/app/core/state.service";
import { WorklogApiService } from "src/app/core/worklog-api.service";
import { AddIncomeResponse } from "src/app/shared/model/add-income-model-response";
import { IncomeFlag } from "src/app/shared/model/income-flag";

@Component({
  selector: "app-add-income",
  templateUrl: "./add-income.component.html",
  styleUrls: ["./add-income.component.scss"],
})
export class AddIncomeComponent implements OnInit {
  id = sessionStorage.getItem("idUser");
  salary = 0;
  @ViewChild("templateModal", { static: true }) templateModal: TemplateRef<any>;
  @Output() addIncomeAlready = new EventEmitter();
  @Input() role: string;
  modalRef: BsModalRef;
  note: string;
  typeUser: string;
  typeVat: string;
  userFlag: string;
  timesheetSynced = false;
  addIncomeResponse: AddIncomeResponse;
  useTimesheetSource = true;

  constructor(
    private modalService: BsModalService,
    private worklogApiService: WorklogApiService,
    private stateService: StateService,
  ) {}

  ngOnInit() {
    this.worklogApiService
      .forCheckTokenPleaseRemoveMeIfFlowLoginFinnished()
      .subscribe(() => this.checkStatusUser());
    this.stateService.isUserType.subscribe((flag) => {
      this.typeUser = flag;
    });
    this.stateService.isUserFlag.subscribe((flag) => {
      this.userFlag = flag;
    });
    this.stateService.isVatType.subscribe((flag) => {
      this.typeVat = flag;
    });
    this.stateService.useTimesheetSource.subscribe((value) => {
      this.useTimesheetSource = value;
      this.checkStatusUser();
    });
  }

  checkStatusUser() {
    this.loadDisplayedIncome();
    this.loadEditTarget();
    this.worklogApiService.getUserByID(this.id).subscribe((user) => {
      this.timesheetSynced = !!user.timesheetSynced;
    });
  }

  /** Fills the form from whichever source the toggle selected. Display only. */
  private loadDisplayedIncome() {
    const request$ = this.useTimesheetSource
      ? this.worklogApiService.getIncomeFromTimesheetByUserID(this.id)
      : this.worklogApiService.getIncomeByUserID(this.id);

    request$.subscribe(
      (res) => {
        if (res === null) {
          this.setDefault();
        } else {
          this.addIncomeResponse = res;
          this.salary = Number(res.netIncome);
          this.note = res.note;
          this.stateService.setFlagUser("N");
          if (!this.useTimesheetSource) {
            this.setEditTarget(res);
          }
        }
      },
      (error) => {
        this.setDefault();
      },
    );
  }

  /**
   * The form always saves through /v1/incomes, so the record it edits has to be the one in the
   * income collection — income_from_timesheet ids do not exist there, and carrying one over made
   * the PUT fail with "mongo: no documents in result". With the timesheet source on, the numbers
   * on screen come from the timesheet record while the save target is looked up separately; a
   * user who has no income record yet saves as an add, and the mirror folds it back into the
   * timesheet record for the period.
   */
  private loadEditTarget() {
    if (!this.useTimesheetSource) {
      return; // the displayed record is the income record itself
    }
    this.worklogApiService.getIncomeByUserID(this.id).subscribe(
      (income) => this.setEditTarget(income),
      (error) => this.setEditTarget(null),
    );
  }

  private setEditTarget(income: AddIncomeResponse | null) {
    IncomeFlag.id = income ? income.id : "";
    IncomeFlag.isUpdate = !!income;
  }

  setDefault() {
    this.addIncomeResponse = null;
    this.salary = 0;
    this.note = "อยากได้เงินก็กรอกมาสิ";
    if (!this.useTimesheetSource) {
      this.setEditTarget(null);
    }
  }

  openTemplateModal() {
    this.openModal(this.templateModal);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { ignoreBackdropClick: true }),
    );
  }

  closeModalEvent(event) {
    if (event) {
      this.closeModal();
      this.ngOnInit();
    }
  }

  addIncomeEmit(event) {
    if (event) {
      this.addIncomeAlready.emit(true);
    } else {
      this.addIncomeAlready.emit(false);
    }
  }

  closeModal() {
    this.modalRef.hide();
  }
}
