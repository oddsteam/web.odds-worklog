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

  it('should get data from backend on init', () => {
    let individualListed = [{
      user: {
        id: '5c0c7f34ee10e80001cb3c9b', role: 'individual',
        firstName: 'aaa', lastName: 'bbb', email: 'who@odds.team', bankAccountName: 'มานะ ไม่มา',
        bankAccountNumber: '9898144777', vat: 'N', slackAccount: ''
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
  })

  it('should get data from backend when export data of the current month', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    let worklogService = createMockWorklogApiService(mockBlob)
    let component = new ListIndividualComponent(worklogService, TestBed.inject(StateService),TestBed.inject(BsModalService));
    component.exportIndividual('0');
    expect(http.get).toHaveBeenCalled();
  });

  it('should call download file automatically when export data successfully', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    let worklogService = createMockWorklogApiService(mockBlob)

    let component = new ListIndividualComponent(worklogService, TestBed.inject(StateService),TestBed.inject(BsModalService));
    spyOn(component, 'downloadFile');
    spyOn(worklogService, 'exportSAPIncomeByPeriod').and.returnValue(of(mockBlob));

    component.exportIndividual('0');
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual.csv');
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual_SAP.txt');
  });

  it('should call exportDataIndividual with correct parameter', () => {
        const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
        spyOn(component, 'downloadFile');
        spyOn(worklogService, 'exportSAPIncomeByPeriod').and.returnValue(of(mockBlob));
        spyOn(worklogService, 'exportDataIndividual').and.returnValue(of(mockBlob));

        component.exportIndividual('0');

        expect(worklogService.exportDataIndividual).toHaveBeenCalledWith('0');
  });

  it('should call exportSAPIncomeByPeriod with correct parameter', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(component, 'downloadFile');
    spyOn(worklogService, 'exportSAPIncomeByPeriod').and.returnValue(of(mockBlob));

    component.exportIndividual('0');

    expect(worklogService.exportSAPIncomeByPeriod).toHaveBeenCalledWith({
        role: "individual",
        startDate: '08/2025',
        endDate: '08/2025',
        dateEffective: '01/08/2025',
    });
  });

  it('should call downloadFile if exportByMonth return response', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportIncomeByMonth').and.returnValue(of(mockBlob));
    spyOn(worklogService, 'exportSAPIncomeByPeriod').and.returnValue(of(mockBlob));
    spyOn(component, 'downloadFile');

    component.exportByMonth();

    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual_specific_month.csv');
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual_SAP_specific_month.txt');
  });

  it('should alert message error when export error', () => {
        spyOn(worklogService, 'exportIncomeByMonth').and.returnValue(throwError(() => new HttpErrorResponse({ status: 500, error: 'Error' })));
        spyOn(worklogService, 'exportSAPIncomeByPeriod').and.returnValue(throwError(() => new HttpErrorResponse({ status: 500, error: 'Error' })));
        spyOn(component, 'downloadFile');
        spyOn(window, 'alert');

        component.exportByMonth();

        expect(window.alert).toHaveBeenCalledWith(`Can't export individual income to CSV file.`);
        expect(window.alert).toHaveBeenCalledWith(`Can't export individual SAP income to CSV file.`);
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
            slackAccount: 'odds@odds.team',
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
            slackAccount: 'odds@odds.team',
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