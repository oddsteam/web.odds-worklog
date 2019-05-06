/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AddIncome } from '../shared/model/add-income-model';
import { ListIncomeResponse } from '../shared/model/list-income-model-response';
import { WorklogApiService } from './worklog-api.service';

describe('Service: WorklogApi', () => {
  let mockService: WorklogApiService;
  let backEnd: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorklogApiService],
      imports: [HttpClientTestingModule],
    });
    mockService = TestBed.get(WorklogApiService);
    backEnd = TestBed.get(HttpTestingController);
  });

  it('should ...', inject([WorklogApiService], (service: WorklogApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should get login api correctly', () => {
    mockService.getLogin().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}login`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    expect(req.request.method).toEqual('POST');
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should get user by id api correctly', () => {
    const userId = '5bde550643b39700012727f2';
    mockService.getUserByID(userId).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}users/${userId}`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    expect(req.request.method).toEqual('GET');
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call get list corporate api correctly', () => {
    mockService.getListIncomeCorporate().subscribe();
    const req = backEnd.match(`${mockService.apiPath}incomes/status/corporate`);
    const req1 = backEnd.match(`${mockService.apiPath}incomes/status/individual`);
    expect(req.length).toBe(2);
    expect(req1.length).toBe(1);
    backEnd.verify();
  });

  it('should get list income corporate correctly', () => {
    const listIncomeResponse: ListIncomeResponse = {
      status: 'active',
      submitDate: '2018-06-12T17:00:00Z',
      user: [
        {
          id: '5bde550643b39700012727f2',
          role: 'corporate',
          firstName: 'odds',
          lastName: 'jung',
          email: 'test@odds.team',
          bankAccountName: 'ทดสอบชอบลงทุน',
          bankAccountNumber: '123123123123',
          thaiCitizenId: '1234567890123',
          vat: 'non-vat',
          slackAccount: 'test@odds.team',
          transcript: '',
          siteId: '',
          site: null,
          project: '',
          imageProfile: null,
          dailyIncome: '200',
          address: 'every Where',
          statusTavi: true
        }
      ]
    };
    mockService.getListIncomeCorporate().subscribe(list => {
      expect(list).toEqual(listIncomeResponse);
    });
    backEnd.match(`${mockService.apiPath}incomes/status/corporate`)[0].flush(listIncomeResponse);
    const req1 = backEnd.match(`${mockService.apiPath}incomes/status/individual`);
    expect(req1.length).toBe(1);
    backEnd.verify();
  });

  it('should get list income individual correctly', () => {
    const listIncomeIndividual: ListIncomeResponse = {
      status: 'active',
      submitDate: '2018-06-12T17:00:00Z',
      user: [
        {
          id: '5bde550643b397000127274re',
          role: 'individual',
          firstName: 'odds',
          lastName: 'jung',
          email: 'test@odds.team',
          bankAccountName: 'ทดสอบชอบลงทุน',
          bankAccountNumber: '123123123123',
          thaiCitizenId: '1234567890123',
          vat: 'non-vat',
          slackAccount: 'test@odds.team',
          transcript: '',
          siteId: '',
          site: null,
          project: '',
          imageProfile: null,
          dailyIncome: '200',
          address: 'every Where',
          statusTavi: true
        }
      ]
    };
    mockService.getListIncomeIndividual().subscribe(list => {
      expect(list).toEqual(listIncomeIndividual);
    });
    backEnd.match(`${mockService.apiPath}incomes/status/individual`)[0].flush(listIncomeIndividual);
    const req = backEnd.match(`${mockService.apiPath}incomes/status/corporate`);

    expect(req.length).toEqual(1);
    backEnd.verify();
  });

  it('should add income api correctly', () => {
    const income: AddIncome = {
      note: '',
      totalIncome: '10000000'
    };
    mockService.addIncomeConfirm(income).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    req.flush(income);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(income);
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should update income api correctly', () => {
    const income: AddIncome = {
      note: '',
      totalIncome: '6969696969'
    };
    mockService.updateIncomeService(income).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    req.flush(income);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(income);
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call export data corporate api correctly', () => {
    mockService.exportDataCorporate('0').subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/export/corporate/0`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call export data individual api correctly', () => {
    mockService.exportDataIndividual('0').subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/export/individual/0`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call export pdf api correctly', () => {
    mockService.exportDataPdf('11111').subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/export/pdf/11111`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call reminder setting api correctly', () => {
    const body = {
      name: 'reminder',
      setting: {
        date: new Date,
        message: 'message'
      }
    };
    mockService.sendMessage(body).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}reminder/setting`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call get setting data api correctly', () => {
    mockService.getSettingData().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}reminder/setting`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    expect(req.request.method).toEqual('GET');
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call get users api correctly', () => {
    mockService.getUsersData().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}users`);
    const req1 = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    const req2 = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    expect(req.request.method).toEqual('GET');
    expect(req1.request.method).toEqual('GET');
    expect(req2.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should set getListIncomeIndividual, getListIncomeCorporate when call initDataService()', () => {
    spyOn(mockService, 'forCheckTokenPleaseRemoveMeIfFlowLoginFinnished').and.returnValue(false);
    spyOn(mockService, 'getListIncomeIndividual').and.returnValue(of());
    spyOn(mockService, 'getListIncomeCorporate').and.returnValue(of());
    mockService.initDataService();
    expect(mockService.getListIncomeIndividual).not.toHaveBeenCalled();
    expect(mockService.getListIncomeCorporate).not.toHaveBeenCalled();

  });

  it('should not set getListIncomeIndividual, getListIncomeCorporate when forcheck() fucntion return false', () => {
    spyOn(mockService, 'forCheckTokenPleaseRemoveMeIfFlowLoginFinnished').and.returnValue(true);
    spyOn(mockService, 'getListIncomeIndividual').and.returnValue(of());
    spyOn(mockService, 'getListIncomeCorporate').and.returnValue(of());
    mockService.initDataService();
    expect(mockService.getListIncomeIndividual).toHaveBeenCalled();
    expect(mockService.getListIncomeCorporate).toHaveBeenCalled();

  });

});
