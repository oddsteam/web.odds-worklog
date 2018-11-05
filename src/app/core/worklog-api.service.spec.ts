/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { WorklogApiService } from './worklog-api.service';
import { environment } from 'src/environments/environment';
import { ListIncomeResponse } from '../shared/model/list-income-model-response';
import { AddIncome } from '../shared/model/add-income-model';

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
    const req = backEnd.expectOne(`${environment.api}login`);
    expect(req.request.method).toEqual('POST');
    backEnd.verify();
  });

  it('should get user by id api correctly', () => {
    const userId = '5bde550643b39700012727f2';
    mockService.getUserByID(userId).subscribe();
    const req = backEnd.expectOne(`${environment.api}users/${userId}`);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should get list income corporate correctly', () => {
    const listIncomeResponse: ListIncomeResponse = {
      status: 'active',
      submitDate: '2018-06-12T17:00:00Z',
      user: [
        {
          id: '5bde550643b39700012727f2',
          fullnameEn: 'odds jung',
          email: 'test@abc.com',
          bankAccountName: 'ทดสอบชอบลงทุน',
          bankAccountNumber: '123123123123',
          thaiCitizenId: '1234567890123',
          corporateFlag: 'Y'
        }
      ]
    };
    mockService.getListIncomeCorporate().subscribe(list => {
      expect(list).toEqual(listIncomeResponse);
    });
    const req = backEnd.expectOne(`${environment.api}incomes/status/corporate`);
    req.flush(listIncomeResponse);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should get list income individual correctly', () => {
    const listIncomeIndividual: ListIncomeResponse = {
      status: 'active',
      submitDate: '2018-06-12T17:00:00Z',
      user: [
        {
          id: '5bde550643b397000127274re',
          fullnameEn: 'odds jung',
          email: 'test@abc.com',
          bankAccountName: 'ทดสอบชอบลงทุน',
          bankAccountNumber: '123123123123',
          thaiCitizenId: '1234567890123',
          corporateFlag: 'N'
        }
      ]
    };
    mockService.getListIncomeIndividual().subscribe(list => {
      expect(list).toEqual(listIncomeIndividual);
    });
    const req = backEnd.expectOne(`${environment.api}incomes/status/individual`);
    req.flush(listIncomeIndividual);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should add income api correctly', () => {
    const income: AddIncome = {
      note: '',
      totalIncome: '10000000'
    };
    mockService.addIncomeConfirm(income).subscribe();
    const req = backEnd.expectOne(`${environment.api}incomes`);
    req.flush(income);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(income);
    backEnd.verify();
  });

  it('should update income api correctly', () => {
    const income: AddIncome = {
      note: '',
      totalIncome: '6969696969'
    };
    mockService.updateIncomeService(income).subscribe();
    const req = backEnd.expectOne(`${environment.api}incomes/`);
    req.flush(income);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(income);
    backEnd.verify();
  });

  it('should call export data corporate api correctly', () => {
    mockService.exportDataCorporate().subscribe();
    const req = backEnd.expectOne(`${environment.api}incomes/export/corporate`);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call export data individual api correctly', () => {
    mockService.exportDataIndividual().subscribe();
    const req = backEnd.expectOne(`${environment.api}incomes/export/individual`);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

});
