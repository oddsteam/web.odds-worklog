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

  it("should call getIncomeFromTimesheetByUserID when the shared timesheet source is on", () => {
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
    spyOn(worklogservice, "getIncomeByUserID");
    component.useTimesheetSource = true;

    component.checkStatusUser();

    expect(worklogservice.getIncomeFromTimesheetByUserID).toHaveBeenCalled();
    expect(worklogservice.getIncomeByUserID).not.toHaveBeenCalled();
    expect(component.addIncomeResponse).toEqual(mockResponse);
  });

  it("should refetch checkStatusUser when the shared timesheet-source toggle changes", () => {
    const stateService = TestBed.inject(StateService);
    spyOn(component, "checkStatusUser");

    stateService.setUseTimesheetSource(true);

    expect(component.useTimesheetSource).toBeTrue();
    expect(component.checkStatusUser).toHaveBeenCalled();
  });
});
