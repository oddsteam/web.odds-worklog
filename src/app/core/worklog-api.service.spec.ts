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
    const req = backEnd.expectOne(`${mockService.apiPath}login`);
    expect(req.request.method).toEqual('POST');
    backEnd.verify();
  });

  it('should get user by id api correctly', () => {
    const userId = '5bde550643b39700012727f2';
    mockService.getUserByID(userId).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}users/${userId}`);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call get list corporate api correctly', () => {
    mockService.getListIncomeCorporate().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
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
          siteId: ''
        }
      ]
    };
    mockService.getListIncomeCorporate().subscribe(list => {
      expect(list).toEqual(listIncomeResponse);
    });
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/status/corporate`);
    req.flush(listIncomeResponse);
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
          siteId: ''
        }
      ]
    };
    mockService.getListIncomeIndividual().subscribe(list => {
      expect(list).toEqual(listIncomeIndividual);
    });
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/status/individual`);
    req.flush(listIncomeIndividual);
    backEnd.verify();
  });

  it('should add income api correctly', () => {
    const income: AddIncome = {
      note: '',
      totalIncome: '10000000'
    };
    mockService.addIncomeConfirm(income).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes`);
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
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/`);
    req.flush(income);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(income);
    backEnd.verify();
  });

  it('should call export data corporate api correctly', () => {
    mockService.exportDataCorporate().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/export/corporate`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    backEnd.verify();
  });

  it('should call export data individual api correctly', () => {
    mockService.exportDataIndividual().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/export/individual`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    backEnd.verify();
  });

  it('should call export pdf api correctly', () => {
    mockService.exportDataPdf().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}incomes/export/pdf`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
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
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    backEnd.verify();
  });

  it('should call get setting data api correctly', () => {
    mockService.getSettingData().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}reminder/setting`);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call get users api correctly', () => {
    mockService.getUsersData().subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}users`);
    expect(req.request.method).toEqual('GET');
    backEnd.verify();
  });

  it('should call upload file api correctly', () => {
    const mockFile = new File([''], 'example.pdf', { type: 'application/pdf', lastModified: 1527052033702 });
    const mockFormData: FormData = new FormData();
    mockFormData.append('file', mockFile);

    mockService.uploadFileTranscript(mockFile).subscribe();
    const req = backEnd.expectOne(`${mockService.apiPath}/files/transcript`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockFormData);
    req.flush({
      tempFileName: '82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf',
      path: 'temp_uploads/82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf',
      fileName: mockFile.name
    });
    backEnd.verify();
  });

});
