import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FirstLoginComponent } from './first-login.component';
import { WorklogApiService } from '../../core/worklog-api.service';
import { of } from 'rxjs';
import { Site } from '../../shared/model/site';

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
    worklogapiService  = TestBed.get(WorklogApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method submit', () => {
    component.ngOnInit();
    component.loginForm.get('firstName').setValue('test');
    component.loginForm.get('lastName').setValue('lastTest');
    component.loginForm.get('bankAccountName').setValue('ทดสอบ');
    component.loginForm.get('bankAccountNumber').setValue('1234567890');
    component.loginForm.get('slackAccount').setValue('test@odds.team');
    spyOn(worklogapiService, 'updateUser').and.returnValue(of());
    component.submit();
    expect(component.user.firstName).toEqual('test');
    expect(component.user.lastName).toEqual('lastTest');
    expect(component.user.bankAccountName).toEqual('ทดสอบ');
    expect(component.user.bankAccountNumber).toEqual('1234567890');
    expect(component.user.slackAccount).toEqual('test@odds.team');
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
});
