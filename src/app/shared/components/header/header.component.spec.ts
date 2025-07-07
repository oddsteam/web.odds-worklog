import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import { of, throwError } from "rxjs";
import { StateService } from "src/app/core/state.service";
import { WorklogApiService } from "src/app/core/worklog-api.service";
import { AddIncomeResponse } from "../../model/add-income-model-response";
import { User } from "../../model/user";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let workLogService: WorklogApiService;
  let stateService: StateService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    workLogService = TestBed.inject(WorklogApiService);
    stateService = TestBed.inject(StateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call forCheckTokenPleaseRemoveMeIfFlowLoginFinnished in worklog service", () => {
    spyOn(
      workLogService,
      "forCheckTokenPleaseRemoveMeIfFlowLoginFinnished"
    ).and.returnValue(of());
    component.ngOnInit();
    expect(
      workLogService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished
    ).toHaveBeenCalled();
  });

  it("should call getUserByID in workLog service", () => {
    const mockResponse = new User({
      id: "5bde550643b397000127274re",
      role: "individual",
      firstName: "odds",
      lastName: "jung",
      email: "test@abc.com",
      bankAccountName: "ทดสอบชอบลงทุน",
      bankAccountNumber: "123123123123",
      thaiCitizenId: "1234567890123",
      slackAccount: "",
      transcript: "",
      siteId: "",
      vat: "123",
    });
    spyOn(workLogService, "getUserByID").and.returnValue(of(mockResponse));
    spyOn(stateService, "setTypeUser");
    spyOn(stateService, "setFlagVat");
    component.getUserID();
    expect(workLogService.getUserByID).toHaveBeenCalled();
    expect(stateService.setTypeUser).toHaveBeenCalledWith("individual");
    expect(stateService.setFlagVat).toHaveBeenCalledWith("123");
  });

  it("name in component should be equal response from getUserByID in workLog service", () => {
    const mockResponse = new User({
      id: "5bde550643b397000127274re",
      role: "individual",
      firstName: "odds",
      lastName: "jung",
      email: "test@abc.com",
      bankAccountName: "ทดสอบชอบลงทุน",
      bankAccountNumber: "123123123123",
      thaiCitizenId: "1234567890123",
      slackAccount: "",
      transcript: "",
      siteId: "",
      vat: "123",
    });
    spyOn(workLogService, "getUserByID").and.returnValue(of(mockResponse));
    spyOn(stateService, "setTypeUser");
    spyOn(stateService, "setFlagVat");
    component.getUserID();
    expect(component.name).toEqual(
      mockResponse.firstName + " " + mockResponse.lastName
    );
    expect(stateService.setTypeUser).toHaveBeenCalledWith("individual");
    expect(stateService.setFlagVat).toHaveBeenCalledWith("123");
  });

  it("should call exportDataPdf from worklogApiService when call exportTavi50", () => {
    spyOn(workLogService, "exportDataPdf").and.returnValue(
      of({
        fileName: "example.pdf",
        path: "82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf",
        tempFileName: "82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf",
        type: "pdf",
        size: 0,
        arrayBuffer: (): any => {},
        stream: (): any => {},
        slice: (): any => {},
        text: (): any => {},
      })
    );
    component.exportTavi50();
    expect(workLogService.exportDataPdf).toHaveBeenCalled();
  });

  it("when exportDataPdf have error it should alert Can`t export to PDF file ", () => {
    spyOn(workLogService, "exportDataPdf").and.returnValue(
      throwError(new HttpErrorResponse({ status: 500, error: "Test Error" }))
    );
    spyOn(window, "alert");
    component.exportTavi50();
    expect(window.alert).toHaveBeenCalledWith(`Can't export to PDF file.`);
  });

  it("should be call function setFlagUser with N in stateService when the response data of getIncomeByUserID not equal null", () => {
    const mockData = <AddIncomeResponse>{
      id: "test",
    };
    spyOn(stateService, "setFlagUser");
    spyOn(workLogService, "getIncomeByUserID").and.returnValue(of(mockData));
    component.getUserIncome();
    expect(stateService.setFlagUser).toHaveBeenCalledWith("N");
  });

  it("should be call function setFlagUser with Y in stateService when the response data of getIncomeByUserID equal null", () => {
    spyOn(stateService, "setFlagUser");
    spyOn(workLogService, "getIncomeByUserID").and.returnValue(of(null));
    component.getUserIncome();
    expect(stateService.setFlagUser).toHaveBeenCalledWith("Y");
  });
});
