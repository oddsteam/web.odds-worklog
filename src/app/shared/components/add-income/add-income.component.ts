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
    const request$ = this.useTimesheetSource
      ? this.worklogApiService.getIncomeFromTimesheetByUserID(this.id)
      : this.worklogApiService.getIncomeByUserID(this.id);

    request$.subscribe(
      (res) => {
        if (res === null) {
          this.setDefault();
        } else {
          IncomeFlag.id = res.id;
          this.addIncomeResponse = res;
          this.salary = Number(res.netIncome);
          this.note = res.note;
          this.stateService.setFlagUser("N");
        }
      },
      (error) => {
        this.setDefault();
      },
    );
    this.worklogApiService.getUserByID(this.id).subscribe((user) => {
      this.timesheetSynced = !!user.timesheetSynced;
    });
  }

  setDefault() {
    IncomeFlag.isUpdate = false;
    IncomeFlag.id = "";
    this.addIncomeResponse = null;
    this.salary = 0;
    this.note = "อยากได้เงินก็กรอกมาสิ";
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
