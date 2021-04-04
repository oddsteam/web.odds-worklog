import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { WorklogApiService } from '../../core/worklog-api.service';
import { Site } from '../../shared/model/site';
import { FirstLoginComponent } from './first-login.component';

describe('FirstLoginComponent', () => {
  let component: FirstLoginComponent;
  let fixture: ComponentFixture<FirstLoginComponent>;
  let worklogapiService: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirstLoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    worklogapiService = TestBed.get(WorklogApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method submit', () => {
    component.ngOnInit();
    component.loginForm.setValue({
      firstName: 'test',
      lastName: 'lastTest',
      corporateName: '',
      bankAccountName: 'ทดสอบ',
      bankAccountNumber: '1234567890',
      slackAccount: 'test@odds.team',
      role: 'individual',
      vat: 'N',
      siteId: 'DTAC',
      project: ''
    });
    spyOn(worklogapiService, 'updateUser').and.returnValue(of());
    component.submit();
    expect(component.user.firstName).toEqual('test');
    expect(component.user.lastName).toEqual('lastTest');
    expect(component.user.bankAccountName).toEqual('ทดสอบ');
    expect(component.user.bankAccountNumber).toEqual('1234567890');
    expect(component.user.slackAccount).toEqual('test@odds.team');
    expect(component.user.role).toEqual('individual');
    expect(component.user.vat).toEqual('N');
    expect(component.user.siteId).toEqual('DTAC');
    expect(worklogapiService.updateUser).toHaveBeenCalled();
  });

  it('should call method getListSite call service worklogAPIService getSitesData', () => {
    const mockListSite: Site[] = [{
      id: '5c0fb860f37e2f8698989cdd',
      name: 'SEC'
    },
    {
      id: '5c0fb875f37e2f8698989cde',
      name: 'SET'
    },
    {
      id: '5c0fb87df37e2f8698989cdf',
      name: 'KTB'
    },
    {
      id: '5c0fb885f37e2f8698989ce0',
      name: 'KBTG'
    },
    {
      id: '5c0fb88af37e2f8698989ce1',
      name: 'DTAC'
    }];
    spyOn(worklogapiService, 'getSitesData').and.returnValue(of(mockListSite));
    component.getListSite();
    expect(worklogapiService.getSitesData).toHaveBeenCalled();
    expect(component.siteList[0].name).toEqual('SEC');
    expect(component.siteList[1].name).toEqual('SET');
    expect(component.siteList[2].name).toEqual('KTB');
    expect(component.siteList[3].name).toEqual('KBTG');
    expect(component.siteList[4].name).toEqual('DTAC');
  });

  it('when call updateUser() but role equal admin router navigate go to corporate', inject([Router], (router: Router) => {
    const res = {
      role: 'admin'
    };
    spyOn(worklogapiService, 'updateUser').and.returnValue(of(res));
    spyOn(router, 'navigate');

    component.updateUser();

    expect(router.navigate).toHaveBeenCalledWith(['corporate']);
  }));

  it('when call updateUser() but role equal individual router navigate go to individual', inject([Router], (router: Router) => {
    const res = {
      role: 'individual'
    };
    spyOn(worklogapiService, 'updateUser').and.returnValue(of(res));
    spyOn(router, 'navigate');

    component.updateUser();

    expect(router.navigate).toHaveBeenCalledWith(['individual']);
  }));

  it('when call updateUser() but error response router navigate go to login', inject([Router], (router: Router) => {

    spyOn(worklogapiService, 'updateUser').and.returnValue(throwError(''));
    spyOn(router, 'navigate');

    component.updateUser();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

});
