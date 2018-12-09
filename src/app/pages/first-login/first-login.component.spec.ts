import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FirstLoginComponent } from './first-login.component';
import { WorklogApiService } from '../../core/worklog-api.service';
import { of } from 'rxjs';

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
});
