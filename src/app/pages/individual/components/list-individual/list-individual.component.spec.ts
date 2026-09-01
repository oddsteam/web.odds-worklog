/* tslint:disable:no-unused-variable */
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTablesModule } from 'angular-datatables';
import { OrderModule } from 'ngx-order-pipe';
import { of, throwError } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListIndividualComponent } from './list-individual.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StateService } from '../../../../core/state.service';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { User } from 'src/app/shared/model/user';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';


describe('ListIndividualComponent', () => {
  let component: ListIndividualComponent;
  let fixture: ComponentFixture<ListIndividualComponent>;
  let worklogService: WorklogApiService;
  let http: HttpClient;
  let modalService: BsModalService;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListIndividualComponent, TableListComponent, StatusHighlightDirective],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, DataTablesModule.forRoot(), ContentLoaderModule, OrderModule],
      providers: [BsModalService, StateService, WorklogApiService, ComponentLoaderFactory, PositioningService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIndividualComponent);
    worklogService = TestBed.inject(WorklogApiService);
    component = fixture.componentInstance;
    modalService = TestBed.inject(BsModalService);

      const mockValueDate$ = of({startDate: '08/2025', endDate: '08/2025', dateEffective: '01/08/2025'});
      const mockModalRef = {
          content: {
              valueDate: mockValueDate$
          }
      };
      spyOn(modalService, 'show').and.returnValue(mockModalRef as any);

  });

  it('should be able to render individual listing page', () => {
    expect(component).toBeTruthy();
  });

  it('should show the timesheet source toggle for an individual-role login', () => {
    component.role = 'individual';
    fixture.detectChanges();

    const toggle = fixture.nativeElement.querySelector('#useTimesheetSource');
    const exportButton = fixture.nativeElement.querySelector('.export-container');

    expect(toggle).withContext('toggle should be visible').not.toBeNull();
    expect(exportButton).withContext('export button should stay admin-only').toBeNull();
  });

  it('should show both the toggle and the export button for an admin login', () => {
    component.role = 'admin';
    fixture.detectChanges();

    const toggle = fixture.nativeElement.querySelector('#useTimesheetSource');
    const exportButton = fixture.nativeElement.querySelector('.export-container');

    expect(toggle).withContext('toggle should be visible').not.toBeNull();
    expect(exportButton).withContext('export button should be visible').not.toBeNull();
  });

  it('should get data from backend on init', () => {
    let individualListed = [{
      user: {
        id: '5c0c7f34ee10e80001cb3c9b', role: 'individual',
        firstName: 'aaa', lastName: 'bbb', email: 'who@odds.team', bankAccountName: 'มานะ ไม่มา',
        bankAccountNumber: '9898144777', vat: 'N'
      }, submitDate: '', status: 'N'
    }] as unknown as ListIncomeResponse;
    let worklogService = createMockWorklogApiService(individualListed)
    let component = new ListIndividualComponent(worklogService, TestBed.inject(StateService),TestBed.inject(BsModalService));
    component.ngOnInit();
    expect(component.listIncomeIndividual).toEqual(individualListed);
  });

  describe('getListIncomeIndividual ', () => {
    it('should get data from backend', () => {
      let mockResponse = mockIndividualUserList();
      let worklogService = createMockWorklogApiService(mockResponse)
      let component = new ListIndividualComponent(worklogService, TestBed.inject(StateService),TestBed.inject(BsModalService));
      component.getListIncomeIndividual();
      expect(http.get).toHaveBeenCalled();
    });

    it('should bound response in data table', () => {
      let mockResponse = mockIndividualUserList();
      let worklogService = createMockWorklogApiService(mockResponse)
      let component = new ListIndividualComponent(worklogService, TestBed.inject(StateService),TestBed.inject(BsModalService));
      component.getListIncomeIndividual();
      expect(component.listIncomeIndividual).toEqual(mockResponse);
    });

    it('should call getListIncomeFromTimesheetIndividual when timesheet source is on', () => {
      const mockResponse = mockIndividualUserList();
      spyOn(worklogService, 'getListIncomeFromTimesheetIndividual').and.returnValue(of(mockResponse));
      spyOn(worklogService, 'getListIncomeIndividual');
      component.useTimesheetSource = true;

      component.getListIncomeIndividual();

      expect(worklogService.getListIncomeFromTimesheetIndividual).toHaveBeenCalled();
      expect(worklogService.getListIncomeIndividual).not.toHaveBeenCalled();
      expect(component.listIncomeIndividual).toEqual(mockResponse);
    });
  })

  it('should refetch the list when the timesheet source toggle changes', () => {
    spyOn(component, 'getListIncomeIndividual');

    component.onToggleSource();

    expect(component.getListIncomeIndividual).toHaveBeenCalled();
  });

  it('should broadcast the toggle value via StateService so other components on the page react', () => {
    const stateService = TestBed.inject(StateService);
    spyOn(stateService, 'setUseTimesheetSource');
    component.useTimesheetSource = true;

    component.onToggleSource();

    expect(stateService.setUseTimesheetSource).toHaveBeenCalledWith(true);
  });

  it('should call exportDataIndividual when export CSV current month', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataIndividual').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportSAPIncomeByPeriod');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = false;

    component.exportCsvCurrentMonth();

    expect(worklogService.exportDataIndividual).toHaveBeenCalledWith('0');
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual.csv');
    expect(worklogService.exportSAPIncomeByPeriod).not.toHaveBeenCalled();
  });

  it('should call exportDataIndividual when export CSV previous month', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataIndividual').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportSAPIncomeByPeriod');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = false;

    component.exportCsvPreviousMonth();

    expect(worklogService.exportDataIndividual).toHaveBeenCalledWith('1');
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual_previous.csv');
    expect(worklogService.exportSAPIncomeByPeriod).not.toHaveBeenCalled();
  });

  it('should call downloadFile if exportCsvByMonth return response', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportIncomeByMonth').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportSAPIncomeByPeriod');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = false;

    component.exportCsvByMonth();

    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual_specific_month.csv');
    expect(worklogService.exportSAPIncomeByPeriod).not.toHaveBeenCalled();
  });

  it('should call exportIncomeByMonth with individual role in specific month export', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(component, 'downloadFile');
    spyOn(worklogService, 'exportIncomeByMonth').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportSAPIncomeByPeriod');
    component.useTimesheetSource = false;

    component.exportCsvByMonth();

    expect(worklogService.exportIncomeByMonth).toHaveBeenCalledWith({
      role: 'individual',
      startDate: '08/2025',
      endDate: '08/2025',
    });
    expect(worklogService.exportSAPIncomeByPeriod).not.toHaveBeenCalled();
  });

  it('should default the timesheet source toggle to on', () => {
    expect(component.useTimesheetSource).toBeTrue();
  });

  it('should call exportDataIncomeFromTimesheetIndividual for current month when timesheet source is on', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataIncomeFromTimesheetIndividual').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportDataIndividual');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = true;

    component.exportCsvCurrentMonth();

    expect(worklogService.exportDataIncomeFromTimesheetIndividual).toHaveBeenCalledWith('0');
    expect(worklogService.exportDataIndividual).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_from_timesheet_individual.csv');
  });

  it('should call exportDataIncomeFromTimesheetIndividual for previous month when timesheet source is on', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataIncomeFromTimesheetIndividual').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportDataIndividual');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = true;

    component.exportCsvPreviousMonth();

    expect(worklogService.exportDataIncomeFromTimesheetIndividual).toHaveBeenCalledWith('1');
    expect(worklogService.exportDataIndividual).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_from_timesheet_individual_previous.csv');
  });

  it('should call exportIncomeFromTimesheetByMonth for a specific month when timesheet source is on', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportIncomeFromTimesheetByMonth').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportIncomeByMonth');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = true;

    component.exportCsvByMonth();

    expect(worklogService.exportIncomeFromTimesheetByMonth).toHaveBeenCalledWith({
      role: 'individual',
      startDate: '08/2025',
      endDate: '08/2025',
    });
    expect(worklogService.exportIncomeByMonth).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_from_timesheet_individual_specific_month.csv');
  });

  it('should alert the timesheet error message when a timesheet export fails', () => {
    spyOn(worklogService, 'exportDataIncomeFromTimesheetIndividual')
      .and.returnValue(throwError(() => new HttpErrorResponse({ status: 500, error: 'Error' })));
    spyOn(component, 'downloadFile');
    spyOn(window, 'alert');
    component.useTimesheetSource = true;

    component.exportCsvCurrentMonth();

    expect(window.alert).toHaveBeenCalledWith(`Can't export income from timesheet to CSV file.`);
    expect(component.downloadFile).not.toHaveBeenCalled();
  });

  it('should call exportPeakIncomeFromTimesheetIndividual for current month when timesheet source is on', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportPeakIncomeFromTimesheetIndividual').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportPeakIndividual');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = true;

    component.exportPeakCurrentMonth();

    expect(worklogService.exportPeakIncomeFromTimesheetIndividual).toHaveBeenCalledWith('0');
    expect(worklogService.exportPeakIndividual).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, component.peakFilenameForMonthIndex('0'));
    expect(component.peakFilenameForMonthIndex('0')).toContain('INDI_TIMESHEET');
  });

  it('should call exportPeakIncomeFromTimesheetIndividual for previous month when timesheet source is on', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportPeakIncomeFromTimesheetIndividual').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportPeakIndividual');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = true;

    component.exportPeakPreviousMonth();

    expect(worklogService.exportPeakIncomeFromTimesheetIndividual).toHaveBeenCalledWith('1');
    expect(worklogService.exportPeakIndividual).not.toHaveBeenCalled();
  });

  it('should call exportPeakIncomeFromTimesheetByMonth for a specific month when timesheet source is on', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportPeakIncomeFromTimesheetByMonth').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportPeakByMonth');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = true;

    component.exportPeakByMonth();

    expect(worklogService.exportPeakIncomeFromTimesheetByMonth).toHaveBeenCalledWith({
      role: 'individual',
      startDate: '08/2025',
      endDate: '08/2025',
    });
    expect(worklogService.exportPeakByMonth).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'PEAK_ImportExpense_INDI_TIMESHEET_08.2025.csv');
  });

  it('should call exportSAPIncomeFromTimesheetByPeriod for current month when timesheet source is on', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportSAPIncomeFromTimesheetByPeriod').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportSAPIncomeByPeriod');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = true;

    component.exportSapCurrentMonth();

    expect(worklogService.exportSAPIncomeFromTimesheetByPeriod).toHaveBeenCalledWith({
      role: 'individual',
      startDate: '08/2025',
      endDate: '08/2025',
      dateEffective: '01/08/2025',
    });
    expect(worklogService.exportSAPIncomeByPeriod).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_from_timesheet_individual_SAP.txt');
  });

  it('should call exportSAPIncomeFromTimesheetByPeriod for previous month when timesheet source is on', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportSAPIncomeFromTimesheetByPeriod').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportSAPIncomeByPeriod');
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = true;

    component.exportSapPreviousMonth();

    expect(worklogService.exportSAPIncomeFromTimesheetByPeriod).toHaveBeenCalled();
    expect(worklogService.exportSAPIncomeByPeriod).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_from_timesheet_individual_SAP_previous.txt');
  });

  it('should call exportPeakIndividual when export PEAK current month', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportPeakIndividual').and.returnValue(of(mockBlob));
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = false;

    component.exportPeakCurrentMonth();

    expect(worklogService.exportPeakIndividual).toHaveBeenCalledWith('0');
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, component.peakFilenameForMonthIndex('0'));
  });

  it('should call exportPeakIndividual when export PEAK previous month', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportPeakIndividual').and.returnValue(of(mockBlob));
    spyOn(component, 'downloadFile');
    component.useTimesheetSource = false;

    component.exportPeakPreviousMonth();

    expect(worklogService.exportPeakIndividual).toHaveBeenCalledWith('1');
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, component.peakFilenameForMonthIndex('1'));
  });

  it('should call exportPeakByMonth with individual role in specific month export', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(component, 'downloadFile');
    spyOn(worklogService, 'exportPeakByMonth').and.returnValue(of(mockBlob));
    component.useTimesheetSource = false;

    component.exportPeakByMonth();

    expect(worklogService.exportPeakByMonth).toHaveBeenCalledWith({
      role: 'individual',
      startDate: '08/2025',
      endDate: '08/2025',
    });
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'PEAK_ImportExpense_INDI_08.2025.csv');
  });

  it('should alert message error when exportPeakByMonth error', () => {
    spyOn(worklogService, 'exportPeakByMonth').and.returnValue(throwError(() => new HttpErrorResponse({ status: 500, error: 'Error' })));
    spyOn(component, 'downloadFile');
    spyOn(window, 'alert');
    component.useTimesheetSource = false;

    component.exportPeakByMonth();

    expect(window.alert).toHaveBeenCalledWith(`Can't export individual income to PEAK file.`);
    expect(component.downloadFile).not.toHaveBeenCalled();
  });

  it('should call exportSAPIncomeByPeriod when export SAP current month', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(component, 'downloadFile');
    spyOn(worklogService, 'exportSAPIncomeByPeriod').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportDataIndividual');
    component.useTimesheetSource = false;

    component.exportSapCurrentMonth();

    expect(worklogService.exportSAPIncomeByPeriod).toHaveBeenCalledWith({
        role: "individual",
        startDate: '08/2025',
        endDate: '08/2025',
        dateEffective: '01/08/2025',
    });
    expect(worklogService.exportDataIndividual).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual_SAP.txt');
  });

  it('should call exportSAPIncomeByPeriod when export SAP previous month', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(component, 'downloadFile');
    spyOn(worklogService, 'exportSAPIncomeByPeriod').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportDataIndividual');
    component.useTimesheetSource = false;

    component.exportSapPreviousMonth();

    expect(worklogService.exportSAPIncomeByPeriod).toHaveBeenCalledWith({
        role: "individual",
        startDate: '08/2025',
        endDate: '08/2025',
        dateEffective: '01/08/2025',
    });
    expect(worklogService.exportDataIndividual).not.toHaveBeenCalled();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual_SAP_previous.txt');
  });

  it('should alert message error when exportCsvByMonth error', () => {
        spyOn(worklogService, 'exportIncomeByMonth').and.returnValue(throwError(() => new HttpErrorResponse({ status: 500, error: 'Error' })));
        spyOn(component, 'downloadFile');
        spyOn(window, 'alert');
        component.useTimesheetSource = false;

        component.exportCsvByMonth();

        expect(window.alert).toHaveBeenCalledWith(`Can't export individual income to CSV file.`);
        expect(component.downloadFile).not.toHaveBeenCalled();
  });

  it('should call get data from backend again when isUpdateList = true', () => {
    let worklogService = createMockWorklogApiService(mockIndividualUserList())
    let component = new ListIndividualComponent(worklogService, TestBed.inject(StateService),TestBed.inject(BsModalService));
    component.isUpdateList = true;
    component.ngOnChanges();
    expect(http.get).toHaveBeenCalled();
  });
  function mockIndividualUserList() {
    return {
        submitDate: '2018-10-09:00:00:00',
        status: 'Y',
        user: [
          new User({
            id: '1233',
            role: 'individual',
            firstName: "ODDS",
            lastName: 'ODDS',
            email: 'odds@odds.team',
            bankAccountName: 'ชวินธร odds',
            bankAccountNumber: '112211221122',
            thaiCitizenId: '12345423',
            siteId: '',
            transcript: '',
            site: null,
            project: '',
            dailyIncome: '',
            address: 'every Where',
            statusTavi: true,
            degreeCertificate: '',
            idCard: '',
          }),
          new User({
            id: '1233',
            role: 'individual',
            firstName: "ODDS",
            lastName: 'ODDS',
            email: 'odds@odds.team',
            bankAccountName: 'ชวินธรสอง odds',
            bankAccountNumber: '112211221122',
            thaiCitizenId: '12345423',
            siteId: '',
            transcript: '',
            site: null,
            project: '',
            dailyIncome: '',
            address: 'every Where',
            statusTavi: true,
            degreeCertificate: '',
            idCard: '',
          }),
        ]
      }
  }
  function createMockWorklogApiService(mockResponse:any) {
      http = {} as HttpClient;
      http.get = jasmine.createSpy().and.returnValue(of(mockResponse));
      http.post = jasmine.createSpy().and.returnValue(of(mockResponse));
      return new WorklogApiService(http);
  }
});
