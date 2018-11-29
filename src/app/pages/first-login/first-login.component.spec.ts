import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FirstLoginComponent } from './first-login.component';
import { WorklogApiService } from '../../core/worklog-api.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('FirstLoginComponent', () => {
  let component: FirstLoginComponent;
  let fixture: ComponentFixture<FirstLoginComponent>;
  let worklogapiService : WorklogApiService;
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

  it('should call method submit', inject([Router], (router: Router) => {
    component.ngOnInit();
    component.firstLogin.get('fullName').setValue('test');
    component.firstLogin.get('bankAccountName').setValue('ทดสอบ');
    component.firstLogin.get('bankAccountNumber').setValue('1234567890');
    spyOn(worklogapiService, 'updateUser').and.returnValue(of());
    spyOn(router, 'navigate');
    component.submit();
    expect(component.user.fullnameEn).toEqual('test');
    expect(component.user.bankAccountName).toEqual('ทดสอบ');
    expect(component.user.bankAccountNumber).toEqual('1234567890');
    expect(worklogapiService.updateUser).toHaveBeenCalled();

  }));
});
