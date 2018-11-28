/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListIndividualComponent } from './list-individual.component';
import { DataTablesModule } from 'angular-datatables';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { OrderModule } from 'ngx-order-pipe';


describe('ListIndividualComponent', () => {
  let component: ListIndividualComponent;
  let fixture: ComponentFixture<ListIndividualComponent>;
  let worklogService: WorklogApiService;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call forCheckTokenPleaseRemoveMeIfFlowLoginFinnished in worklog service', () => {
    spyOn(worklogService, 'forCheckTokenPleaseRemoveMeIfFlowLoginFinnished').and.returnValue(of());
    component.ngOnInit();
    expect(worklogService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished).toHaveBeenCalled();
  });

  it('should call getListIncomeIndividual in worklog service', () => {
    const mockResponse = {
      submitDate: '2018-10-09:00:00:00',
      status: 'Y',
      user: [
        {
          id: '1233',
          fullnameEn: 'ODDS ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'ชวินธร odds',
          bankAccountNumber: '112211221122',
          corporateFlag: 'N',
          thaiCitizenId: '12345423'
        },
        {
          id: '1233',
          fullnameEn: 'ODDS ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'ชวินธรสอง odds',
          bankAccountNumber: '112211221122',
          corporateFlag: 'N',
          thaiCitizenId: '12345423'
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
          fullnameEn: 'ODDS ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          corporateFlag: 'N',
          thaiCitizenId: '12345423',
          vat: 'non-vat'
        },
        {
          id: '1233',
          fullnameEn: 'ODDS ODDS',
          email: 'odds@odds.team',
          bankAccountName: 'odds odds',
          bankAccountNumber: '112211221122',
          corporateFlag: 'N',
          thaiCitizenId: '12345423',
          vat: 'non-vat'
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
    component.exportIndividual();
    expect(worklogService.exportDataIndividual).toHaveBeenCalled();
  });

  it('should call downloadFile if exportDataIndividual return response', () => {
    const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
    spyOn(worklogService, 'exportDataIndividual').and.returnValue(of(mockBlob));
    spyOn(component, 'downloadFile');
    component.exportIndividual();
    expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_individual.csv');
  });

  it('alert message if exportDataIndividual return error', () => {
    spyOn(worklogService, 'exportDataIndividual').and.callFake(() => {
      return throwError('Fake Error');
    });
    spyOn(window, 'alert');
    component.exportIndividual();
    expect(window.alert).toHaveBeenCalledWith(`Can't export individual income to CSV file.`);
  });
});
