/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { DataTablesModule } from 'angular-datatables';
import { OrderModule } from 'ngx-order-pipe';
import { of, throwError } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListIndividualComponent } from './list-individual.component';


describe('ListIndividualComponent', () => {
  let component: ListIndividualComponent;
  let fixture: ComponentFixture<ListIndividualComponent>;
  let worklogService: WorklogApiService;
  let individualListed;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListIndividualComponent, TableListComponent, StatusHighlightDirective],
      imports: [HttpClientTestingModule, DataTablesModule.forRoot(), ContentLoaderModule, OrderModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIndividualComponent);
    worklogService = TestBed.get(WorklogApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    individualListed = [{
      user: {
        id: '5c0c7f34ee10e80001cb3c9b', role: 'individual'
        , firstName: 'aaa', lastName: 'bbb', email: 'who@odds.team', bankAccountName: 'มานะ ไม่มา'
        , bankAccountNumber: '9898144777', vat: 'N', slackAccount: ''
      }, submitDate: '', status: 'N'
    }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call forCheckTokenPleaseRemoveMeIfFlowLoginFinnished in worklog service', () => {
    spyOn(worklogService, 'getIndividualListed').and.returnValue(individualListed);
    component.ngOnInit();
    expect(component.listIncomeIndividual).toEqual(individualListed);
  });

  it('should call getListIncomeIndividual in worklog service', () => {
    const mockResponse = {
      submitDate: '2018-10-09:00:00:00',
      status: 'Y',
      user: [
        {
          id: '1233',
          role: 'individual',
          fullnameEn: 'ODDS ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'ชวินธร odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: '',
          site: null,
          project: '',
          dailyIncome: ''
        },
        {
          id: '1233',
          role: 'individual',
          fullnameEn: 'ODDS ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'ชวินธรสอง odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: '',
          site: null,
          project: '',
          dailyIncome: ''
        },
      ]
    };
    spyOn(worklogService, 'getListIncomeIndividual').and.returnValue(of(mockResponse));
    component.getListIncomeIndividual();
    expect(worklogService.getListIncomeIndividual).toHaveBeenCalled();
  });

  it('listIncome should equal to response data', () => {
    const mockResponse = {
      submitDate: '2018-10-09:00:00:00',
      status: 'Y',
      user: [
        {
          id: '1233',
          role: 'individual',
          firstName: 'ODDS',
          lastName: 'ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          vat: 'non-vat',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: '',
          site: null,
          imageProfile: null,
          project: '',
          dailyIncome: '',
          address: 'every Where'
        },
        {
          id: '1233',
          role: 'individual',
          firstName: 'ODDS',
          lastName: 'ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          vat: 'non-vat',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: '',
          site: null,
          imageProfile: null,
          project: '',
          dailyIncome: '',
          address: 'every Where'
        },
      ]
    };
    spyOn(worklogService, 'getListIncomeIndividual').and.returnValue(of(mockResponse));
    component.getListIncomeIndividual();
    expect(component.listIncomeIndividual).toEqual(mockResponse);
  });

  it('should call exportDataIndividual', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataIndividual').and.returnValue(of(mockBlob));
    component.exportIndividual('0');
    expect(worklogService.exportDataIndividual).toHaveBeenCalled();
  });

  it('should call downloadFile if exportDataIndividual return response', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataIndividual').and.returnValue(of(mockBlob));
    spyOn(component, 'downloadFile');
    component.exportIndividual('0');
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual.csv');
  });

  it('alert message if exportDataIndividual return error', () => {
    spyOn(worklogService, 'exportDataIndividual').and.callFake(() => {
      return throwError('Fake Error');
    });
    spyOn(window, 'alert');
    component.exportIndividual('0');
    expect(window.alert).toHaveBeenCalledWith(`Can't export individual income to CSV file.`);
  });

  it('should call getListIncomeIndividual when isUpdateList = true', () => {
    const mockResponse = {
      submitDate: '2018-10-09:00:00:00',
      status: 'Y',
      user: [
        {
          id: '1233',
          role: 'individual',
          firstName: 'ODDS',
          lastName: 'ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          vat: 'non-vat',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: '',
          site: null,
          dailyIncome: ''
        },
        {
          id: '1233',
          role: 'individual',
          firstName: 'ODDS',
          lastName: 'ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          vat: 'non-vat',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: '',
          site: null,
          dailyIncome: ''
        },
      ]
    };
    spyOn(worklogService, 'getListIncomeIndividual').and.returnValue(of(mockResponse));
    component.isUpdateList = true;
    component.ngOnChanges();
    expect(worklogService.getListIncomeIndividual).toHaveBeenCalled();
  });
});
