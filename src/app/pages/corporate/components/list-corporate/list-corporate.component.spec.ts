import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { OrderModule } from 'ngx-order-pipe';
import { of, throwError } from 'rxjs';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListCorporateComponent } from './list-corporate.component';


describe('ListCorporateComponent', () => {
  let component: ListCorporateComponent;
  let fixture: ComponentFixture<ListCorporateComponent>;
  let worklogService: WorklogApiService;
  let stateService: StateService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCorporateComponent, TableListComponent, StatusHighlightDirective],
      imports: [HttpClientTestingModule, ContentLoaderModule, OrderModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCorporateComponent);
    worklogService = TestBed.get(WorklogApiService);
    stateService = TestBed.get(StateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call forCheckTokenPleaseRemoveMeIfFlowLoginFinnished in worklog service', () => {
    spyOn(worklogService, 'forCheckTokenPleaseRemoveMeIfFlowLoginFinnished').and.returnValue(of());
    component.ngOnInit();
    expect(worklogService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished).toHaveBeenCalled();
  });

  it('forCheckTokenPleaseRemoveMeIfFlowLoginFinnished should be defined', () => {
    spyOn(stateService, 'listIncomeCorporateTrigger').and.returnValue(of());
    component.ngOnInit();
    expect(stateService.listIncomeCorporateTrigger).toBeDefined();
  });

  it('should call getListIncomeCorporate', () => {
    spyOn(stateService, 'listIncomeCorporateTrigger').and.returnValue(of());
    spyOn(component, 'getListIncomeCorporate');
    component.ngOnInit();
    expect(component.getListIncomeCorporate).toHaveBeenCalled();
  });

  it('should call getListIncomeCorporate in worklog service', () => {
    const mockResponse = {
      submitDate: '2018-10-09:00:00:00',
      status: 'Y',
      user: [
        {
          id: '1233',
          role: 'corporate',
          fullnameEn: 'ODDS ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: ''
        },
        {
          id: '1233',
          role: 'corporate',
          fullnameEn: 'ODDS ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: ''
        },
      ]
    };
    spyOn(worklogService, 'getListIncomeCorporate').and.returnValue(of(mockResponse));
    component.getListIncomeCorporate();
    expect(worklogService.getListIncomeCorporate).toHaveBeenCalled();
  });

  it('listIncome should equal to response data', () => {
    const mockResponse = {
      submitDate: '2018-10-09:00:00:00',
      status: 'Y',
      user: [
        {
          id: '1233',
          role: 'corporate',
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
          site: null
        },
        {
          id: '1233',
          role: 'corporate',
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
          site: null
        },
      ]
    };
    spyOn(worklogService, 'getListIncomeCorporate').and.returnValue(of(mockResponse));
    component.getListIncomeCorporate();
    expect(component.listIncome).toEqual(mockResponse);
  });

  it('should call exportDataCorporate', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataCorporate').and.returnValue(of(mockBlob));
    component.exportCorporate();
    expect(worklogService.exportDataCorporate).toHaveBeenCalled();
  });

  it('should call downloadFile if exportDataCorporate return response', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataCorporate').and.returnValue(of(mockBlob));
    spyOn(component, 'downloadFile');
    component.exportCorporate();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_corporate.csv');
  });

  it('alert message if exportDataCorporate return error', () => {
    spyOn(worklogService, 'exportDataCorporate').and.callFake(() => {
      return throwError('Fake Error');
    });
    spyOn(window, 'alert');
    component.exportCorporate();
    expect(window.alert).toHaveBeenCalledWith(`Can't export corporate income to CSV file.`);
  });

  it('should call getListIncomeCorporate when isUpdateList = true', () => {
    const mockResponse = {
      submitDate: '2018-10-09:00:00:00',
      status: 'Y',
      user: [
        {
          id: '1233',
          role: 'corporate',
          firstName: 'ODDS',
          lastName: 'ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          vat: 'non-vat',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: ''
        },
        {
          id: '1233',
          role: 'corporate',
          firstName: 'ODDS',
          lastName: 'ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          thaiCitizenId: '12345423',
          vat: 'non-vat',
          slackAccount: 'odds@odds.team',
          siteId: '',
          transcript: ''
        },
      ]
    };
    spyOn(worklogService, 'getListIncomeCorporate').and.returnValue(of(mockResponse));
    component.isUpdateList = true;
    component.ngOnChanges();
    expect(worklogService.getListIncomeCorporate).toHaveBeenCalled();
  });
});
