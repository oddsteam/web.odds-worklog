import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddIncomeComponent } from "./add-income.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { WorklogApiService } from "src/app/core/worklog-api.service";
import { of, throwError } from "rxjs";
import { AddIncomeResponse } from "src/app/shared/model/add-income-model-response";
import { ComponentLoaderFactory } from "ngx-bootstrap/component-loader";
import { PositioningService } from "ngx-bootstrap/positioning";
import { StateService } from "src/app/core/state.service";
import { IncomeFlag } from "src/app/shared/model/income-flag";

function incomeResponse(
  overrides: Partial<AddIncomeResponse> = {},
): AddIncomeResponse {
  return {
    id: "01",
    userId: "0000022233",
    totalIncome: "100000",
    netIncome: "40",
    netDailyIncome: "",
    submitDate: "2018-10-22:00:00:00",
    note: "",
    vat: "0.23",
    wht: "100",
    workDate: "20",
    specialIncome: "100",
    netSpecialIncome: "2000",
    workingHours: "10",
    ...overrides,
  };
}

describe("AddIncomeComponent", () => {
  let component: AddIncomeComponent;
  let fixture: ComponentFixture<AddIncomeComponent>;
  let worklogservice: WorklogApiService;
  let modalService: BsModalService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddIncomeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        BsModalService,
        ComponentLoaderFactory,
        PositioningService,
        WorklogApiService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncomeComponent);
    worklogservice = TestBed.inject(WorklogApiService);
    modalService = TestBed.inject(BsModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getIncomeFromTimesheetByUserID in worklog service", () => {
    const mockResponse: AddIncomeResponse = {
      id: "01",
      userId: "0000022233",
      totalIncome: "100000",
      netIncome: "40",
      netDailyIncome: "",
      submitDate: "2018-10-22:00:00:00",
      note: "",
      vat: "0.23",
      wht: "100",
      workDate: "20",
      specialIncome: "100",
      netSpecialIncome: "2000",
      workingHours: "10",
    };
    spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.returnValue(
      of(mockResponse),
    );
    component.checkStatusUser();
    expect(worklogservice.getIncomeFromTimesheetByUserID).toHaveBeenCalled();
  });

  it("addIncomeResponse should be equal data from service if getIncomeFromTimesheetByUserID is not error", () => {
    const mockResponse: AddIncomeResponse = {
      id: "01",
      userId: "0000022233",
      totalIncome: "100000",
      netIncome: "40",
      netDailyIncome: "",
      submitDate: "2018-10-22:00:00:00",
      note: "",
      vat: "0.23",
      wht: "100",
      workDate: "20",
      specialIncome: "100",
      netSpecialIncome: "2000",
      workingHours: "10",
    };
    spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.returnValue(
      of(mockResponse),
    );
    component.checkStatusUser();
    expect(component.addIncomeResponse).toEqual(mockResponse);
  });

  it("addIncomeResponse should be null if getIncomeFromTimesheetByUserID is error", () => {
    spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.callFake(() => {
      return throwError(new Error("Fake error"));
    });
    component.checkStatusUser();
    expect(component.addIncomeResponse).toBeNull();
  });

  it("should call openModal", () => {
    spyOn(component, "openModal");
    component.openTemplateModal();
    expect(component.openModal).toHaveBeenCalled();
  });

  it("should emit addIncomeAlready with true if event is true", () => {
    spyOn(component.addIncomeAlready, "emit");
    component.addIncomeEmit(true);
    expect(component.addIncomeAlready.emit).toHaveBeenCalledWith(true);
  });

  it("should emit addIncomeAlready with false if event is undefined", () => {
    spyOn(component.addIncomeAlready, "emit");
    component.addIncomeEmit(undefined);
    expect(component.addIncomeAlready.emit).toHaveBeenCalledWith(false);
  });
  it("should fetch the user and store timesheetSynced when checking status", () => {
    const mockUser: any = { id: "0000022233", timesheetSynced: true };
    spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.returnValue(of(null));
    spyOn(worklogservice, "getUserByID").and.returnValue(of(mockUser));
    component.checkStatusUser();
    expect(worklogservice.getUserByID).toHaveBeenCalled();
    expect(component.timesheetSynced).toBe(true);
  });

  it("should default timesheetSynced to false when the user is not synced", () => {
    const mockUser: any = { id: "0000022233", timesheetSynced: false };
    spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.returnValue(of(null));
    spyOn(worklogservice, "getUserByID").and.returnValue(of(mockUser));
    component.checkStatusUser();
    expect(component.timesheetSynced).toBe(false);
  });

  it("should not show the Add Income button when timesheetSynced is true and userFlag is Y", () => {
    component.userFlag = "Y";
    component.timesheetSynced = true;
    fixture.detectChanges();
    const addButton = fixture.nativeElement.querySelector("#btn-add");
    expect(addButton).toBeNull();
  });

  it("should still show the Edit Income button when timesheetSynced is true and userFlag is N", () => {
    component.userFlag = "N";
    component.timesheetSynced = true;
    fixture.detectChanges();
    const editButton = fixture.nativeElement.querySelector("#btn-edit");
    expect(editButton).not.toBeNull();
  });

  it("should show the Add Income button when timesheetSynced is false and userFlag is Y", () => {
    component.userFlag = "Y";
    component.timesheetSynced = false;
    fixture.detectChanges();
    const addButton = fixture.nativeElement.querySelector("#btn-add");
    expect(addButton).not.toBeNull();
  });

  it("should show the timesheet record when the shared timesheet source is on", () => {
    const mockResponse = incomeResponse({ id: "timesheet-01" });
    spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.returnValue(
      of(mockResponse),
    );
    spyOn(worklogservice, "getIncomeByUserID").and.returnValue(of(null));
    component.useTimesheetSource = true;

    component.checkStatusUser();

    expect(worklogservice.getIncomeFromTimesheetByUserID).toHaveBeenCalled();
    expect(component.addIncomeResponse).toEqual(mockResponse);
  });

  describe("the record the form saves to", () => {
    // The form always saves through /v1/incomes, so the id it carries has to be the one from
    // the income collection. income_from_timesheet ids do not exist there, and reusing one
    // made the PUT fail with "mongo: no documents in result".
    it("should take its id from the income collection while the timesheet source is on", () => {
      spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.returnValue(
        of(incomeResponse({ id: "timesheet-01" })),
      );
      spyOn(worklogservice, "getIncomeByUserID").and.returnValue(
        of(incomeResponse({ id: "income-01" })),
      );
      component.useTimesheetSource = true;

      component.checkStatusUser();

      expect(IncomeFlag.id).toBe("income-01");
      expect(IncomeFlag.isUpdate).toBeTrue();
    });

    it("should be an add when the timesheet source is on but the user has no income record yet", () => {
      spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.returnValue(
        of(incomeResponse({ id: "timesheet-01" })),
      );
      spyOn(worklogservice, "getIncomeByUserID").and.returnValue(of(null));
      component.useTimesheetSource = true;

      component.checkStatusUser();

      expect(IncomeFlag.id).toBe("");
      expect(IncomeFlag.isUpdate).toBeFalse();
    });

    it("should be an add when the timesheet source is on and the income lookup fails", () => {
      spyOn(worklogservice, "getIncomeFromTimesheetByUserID").and.returnValue(
        of(incomeResponse({ id: "timesheet-01" })),
      );
      spyOn(worklogservice, "getIncomeByUserID").and.returnValue(
        throwError(new Error("Fake error")),
      );
      component.useTimesheetSource = true;

      component.checkStatusUser();

      expect(IncomeFlag.id).toBe("");
      expect(IncomeFlag.isUpdate).toBeFalse();
    });

    it("should take its id from the displayed record while the timesheet source is off", () => {
      spyOn(worklogservice, "getIncomeByUserID").and.returnValue(
        of(incomeResponse({ id: "income-01" })),
      );
      spyOn(worklogservice, "getIncomeFromTimesheetByUserID");
      component.useTimesheetSource = false;

      component.checkStatusUser();

      expect(worklogservice.getIncomeFromTimesheetByUserID).not.toHaveBeenCalled();
      expect(IncomeFlag.id).toBe("income-01");
      expect(IncomeFlag.isUpdate).toBeTrue();
    });
  });

  it("should refetch checkStatusUser when the shared timesheet-source toggle changes", () => {
    const stateService = TestBed.inject(StateService);
    spyOn(component, "checkStatusUser");

    stateService.setUseTimesheetSource(true);

    expect(component.useTimesheetSource).toBeTrue();
    expect(component.checkStatusUser).toHaveBeenCalled();
  });
});
