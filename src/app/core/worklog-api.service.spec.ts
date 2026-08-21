/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { AddIncome } from "../shared/model/add-income-model";
import { ListIncomeResponse } from "../shared/model/list-income-model-response";
import { WorklogApiService } from "./worklog-api.service";
import { RequestExportIncome, RequestExportSAPIncome } from "../shared/model/request-export-income";

describe("Service: WorklogApi", () => {
  let mockService: WorklogApiService;
  let backEnd: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorklogApiService],
      imports: [HttpClientTestingModule],
    });
    mockService = TestBed.inject(WorklogApiService);
    backEnd = TestBed.inject(HttpTestingController);
  });

  it("should ...", inject([WorklogApiService], (service: WorklogApiService) => {
    expect(service).toBeTruthy();
  }));

  it("should get login api correctly", () => {
    mockService.getLogin().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}v1/login`);
    expect(req.request.method).toEqual("POST");
    backEnd.verify();
  });

  it("should get user by id api correctly", () => {
    const userId = "5bde550643b39700012727f2";
    mockService.getUserByID(userId).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}v1/users/${userId}`);
    expect(req.request.method).toEqual("GET");
    backEnd.verify();
  });

  it("should get list income individual correctly", () => {
    const listIncomeIndividual: ListIncomeResponse = {
      status: "active",
      submitDate: "2018-06-12T17:00:00Z",
      user: [
        {
          id: "5bde550643b397000127274re",
          role: "individual",
          firstName: "odds",
          lastName: "jung",
          email: "test@odds.team",
          peakCode: "",
          bankAccountName: "ทดสอบชอบลงทุน",
          bankAccountNumber: "123123123123",
          thaiCitizenId: "1234567890123",
          vat: "non-vat",
          transcript: "",
          siteId: "",
          site: null,
          project: "",
          imageProfile: null,
          dailyIncome: "200",
          address: "every Where",
          statusTavi: true,
          degreeCertificate: "",
          idCard: "",
          phone: "",
          startDate: "2022-1-1",
          timesheetSynced: false,
        },
      ],
    };
    mockService.getListIncomeIndividual().subscribe((list) => {
      expect(list).toEqual(listIncomeIndividual);
    });
    backEnd
      .match(`${mockService.apiPath}v1/incomes/status/individual`)[0]
      .flush(listIncomeIndividual);
    backEnd.verify();
  });

  it("should get list income from timesheet individual correctly", () => {
    const listIncomeIndividual: ListIncomeResponse = {
      status: "active",
      submitDate: "2018-06-12T17:00:00Z",
      user: [],
    };
    mockService.getListIncomeFromTimesheetIndividual().subscribe((list) => {
      expect(list).toEqual(listIncomeIndividual);
    });
    backEnd
      .match(`${mockService.apiPath}v1/income-from-timesheet/status/individual`)[0]
      .flush(listIncomeIndividual);
    backEnd.verify();
  });

  it("should get income from timesheet by user id correctly", () => {
    const userId = "5bde550643b39700012727f2";
    mockService.getIncomeFromTimesheetByUserID(userId).subscribe();
    const req = backEnd.expectOne(
      `${mockService.apiPath}v1/income-from-timesheet/current-month/${userId}`
    );
    expect(req.request.method).toEqual("GET");
    backEnd.verify();
  });

  it("should add income api correctly", () => {
    const income: AddIncome = {
      note: "",
      totalIncome: "10000000",
    };
    mockService.addIncomeConfirm(income).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}v1/incomes`);
    req.flush(income);
    expect(req.request.method).toEqual("POST");
    expect(req.request.body).toEqual(income);
    backEnd.verify();
  });

  it("should update income api correctly", () => {
    const income: AddIncome = {
      note: "",
      totalIncome: "6969696969",
    };
    mockService.updateIncomeService(income).subscribe((_) => {
      const req = backEnd.expectOne(`${mockService.apiPath}v1/incomes/`);
      req.flush(income);
      expect(req.request.method).toEqual("PUT");
      expect(req.request.body).toEqual(income);
      backEnd.verify();
    });
  });

  it("should call export data individual api correctly", () => {
    mockService.exportDataIndividual("0").subscribe((_) => {
      const req = backEnd.expectOne(
        `${mockService.apiPath}v1/incomes/export/individual/0`
      );
      expect(req.request.method).toEqual("GET");
      expect(req.request.responseType).toEqual("blob");
      backEnd.verify();
    });
  });

  it("should call export data income from timesheet individual api correctly", () => {
    mockService.exportDataIncomeFromTimesheetIndividual("0").subscribe((_) => {
      const req = backEnd.expectOne(
        `${mockService.apiPath}v1/income-from-timesheet/export/individual/0`
      );
      expect(req.request.method).toEqual("GET");
      expect(req.request.responseType).toEqual("blob");
      backEnd.verify();
    });
  });

  it("should call export income from timesheet by month api correctly", () => {
    mockService
      .exportIncomeFromTimesheetByMonth(new RequestExportIncome())
      .subscribe();
    const req = backEnd.expectOne(
      `${mockService.apiPath}v1/income-from-timesheet/export`
    );
    expect(req.request.method).toEqual("POST");
    expect(req.request.responseType).toEqual("blob");
    backEnd.verify();
  });

  it("should call export peak income from timesheet individual api correctly", () => {
    mockService.exportPeakIncomeFromTimesheetIndividual("0").subscribe();
    const req = backEnd.expectOne(
      `${mockService.apiPath}v1/income-from-timesheet/export/peak/individual/0`
    );
    expect(req.request.method).toEqual("GET");
    expect(req.request.responseType).toEqual("blob");
    backEnd.verify();
  });

  it("should call export peak income from timesheet by month api correctly", () => {
    mockService
      .exportPeakIncomeFromTimesheetByMonth(new RequestExportIncome())
      .subscribe();
    const req = backEnd.expectOne(
      `${mockService.apiPath}v1/income-from-timesheet/export/peak`
    );
    expect(req.request.method).toEqual("POST");
    expect(req.request.responseType).toEqual("blob");
    backEnd.verify();
  });

  it("should call export SAP income from timesheet by period api correctly", () => {
    mockService
      .exportSAPIncomeFromTimesheetByPeriod(new RequestExportSAPIncome())
      .subscribe();
    const req = backEnd.expectOne(
      `${mockService.apiPath}v1/income-from-timesheet/export/format/SAP`
    );
    expect(req.request.method).toEqual("POST");
    expect(req.request.responseType).toEqual("blob");
    backEnd.verify();
  });

  it("should call export income by month api correctly", () => {
    mockService
      .exportIncomeByMonth(new RequestExportIncome())
      .subscribe((_) => {
        const req = backEnd.expectOne(`${mockService.apiPath}incomes/export`);
        expect(req.request.method).toEqual("POST");
        expect(req.request.responseType).toEqual("blob");
        backEnd.verify();
      });
  });

  it("should call export peak individual api correctly", () => {
    mockService.exportPeakIndividual("0").subscribe((_) => {
      const req = backEnd.expectOne(
        `${mockService.apiPath}v1/incomes/export/peak/individual/0`
      );
      expect(req.request.method).toEqual("GET");
      expect(req.request.responseType).toEqual("blob");
      backEnd.verify();
    });
  });

  it("should call export peak by month api correctly", () => {
    mockService
      .exportPeakByMonth(new RequestExportIncome())
      .subscribe((_) => {
        const req = backEnd.expectOne(`${mockService.apiPath}v1/incomes/export/peak`);
        expect(req.request.method).toEqual("POST");
        expect(req.request.responseType).toEqual("blob");
        backEnd.verify();
      });
  });


it("should call export SAP income by period correctly", () => {
    mockService
        .exportSAPIncomeByPeriod({role: 'individual', startDate: '01/2023', endDate: '01/2023', dateEffective: '01/02/2023'})
        .subscribe((_) => {
            const req = backEnd.expectOne(`${mockService.apiPath}incomes/export`);
            expect(req.request.method).toEqual("POST");
            expect(req.request.responseType).toEqual("blob");
            backEnd.verify();
        });
});

  it("should call get users api correctly", () => {
    mockService.getUsersData().subscribe((_) => {
      const req = backEnd.expectOne(`${mockService.apiPath}users`);
      expect(req.request.method).toEqual("GET");
      backEnd.verify();
    });
  });

  it("should set getListIncomeIndividual when call initDataService()", () => {
    spyOn(
      mockService,
      "forCheckTokenPleaseRemoveMeIfFlowLoginFinnished"
    ).and.returnValue(of(false));
    spyOn(mockService, "getListIncomeIndividual").and.returnValue(of());
    mockService.initDataService();
    expect(mockService.getListIncomeIndividual).not.toHaveBeenCalled();
  });

  it("should set getListIncomeIndividual when forcheck() function return true", () => {
    spyOn(
      mockService,
      "forCheckTokenPleaseRemoveMeIfFlowLoginFinnished"
    ).and.returnValue(of(true));
    spyOn(mockService, "getListIncomeIndividual").and.returnValue(of());
    mockService.initDataService();
    expect(mockService.getListIncomeIndividual).toHaveBeenCalled();
  });
});
