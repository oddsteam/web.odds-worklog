import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { StateService } from '../core/state.service';
import { WorklogApiService } from '../core/worklog-api.service';
import { AddIncomeComponent } from '../shared/components/add-income/add-income.component';
import { ModalIncomeComponent } from '../shared/components/modal-income/modal-income.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { TabMenuComponent } from '../shared/components/tab-menu/tab-menu.component';
import { LayoutsComponent } from './layouts.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { CorporateComponent } from '../pages/corporate/corporate.component';

describe('LayoutsComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;
  let worklogApiService: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutsComponent, TabMenuComponent, HeaderComponent, AddIncomeComponent, ModalIncomeComponent],
      imports: [CommonModule, ReactiveFormsModule, FormsModule,
        RouterTestingModule.withRoutes([
        {path: 'login', component: LoginLayoutComponent},
        {path: 'corporate', component: CorporateComponent},
      ]), HttpClientTestingModule
        , TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })],
      providers: [WorklogApiService, StateService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsComponent);
    worklogApiService = TestBed.inject(WorklogApiService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method ngOnInit to Have Been Called worklogApiService getUserById ', () => {
    const mockUsers = {
      id: '1234567890',
      role: 'corporate',
      fullnameEn: 'ทดสอบ ชอบลงทุน',
      email: 'abc@abc.com',
      bankAccountName: 'ทดสอบ ชอบลงทุน',
      bankAccountNumber: '0987654321',
      thaiCitizenId: '1234567890',
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValues(of(mockUsers));
    component.ngOnInit();
    expect(worklogApiService.getUserByID).toHaveBeenCalled();
  });

  // it('should sessionStorage token equal by response from worklogApiService', () => {
  //   const mockToken = {
  //     token: '.eyJ1c2VySWQiOiJbyZVcdWZmZmQ6Mlx1MDAwNFx1ZmZmZGBcdWZmZmRcclx1ZmZ'
  //   };
  //   spyOn(worklogApiService, 'getLogin').and.returnValues(of(mockToken));
  //   component.ngOnInit();
  //   expect(sessionStorage.getItem('token')).toEqual('Bearer ' + mockToken.token);
  // });

  it('should navigate to login if response from service is null', inject([Router], (router: Router) => {
    spyOn(worklogApiService, 'getUserByID').and.returnValues(of(null));
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should navigate to firstlogin if first name from service is empty', inject([Router], (router: Router) => {
    const mockUser = {
      id: '1234567890',
      firstName: '',
      lastName: '',
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValues(of(mockUser));
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/firstlogin']);
  }));

  it('should not call goToPage when worklogApiService return response null', () => {
    const mockToken = {
      token: '.eyJ1c2VySWQiOiJbyZVcdWZmZmQ6Mlx1MDAwNFx1ZmZmZGBcdWZmZmRcclx1ZmZ'
    };
    spyOn(worklogApiService, 'getLogin').and.returnValues(of(mockToken));
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(''));
    spyOn(component, 'goToPage');
    component.ngOnInit();
    expect(component.goToPage).toHaveBeenCalledTimes(0);
  });

  it('should navigate to /corporate when role is admin', inject([Router], (router: Router) => {
    const res = {
      role: 'admin'
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(res));
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(component.personType).toEqual('admin');
    expect(router.navigate).toHaveBeenCalledWith(['/corporate']);
  }));

  it('should navigate to /individual when role is individual', inject([Router], (router: Router) => {
    const res = {
      role: 'individual'
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(res));
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(component.personType).toEqual('individual');
    expect(router.navigate).toHaveBeenCalledWith(['/individual']);
  }));

  it('should navigate to /corporate when role is corporate', inject([Router], (router: Router) => {
    const res = {
      role: 'corporate'
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(res));
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(component.personType).toEqual('corporate');
    expect(router.navigate).toHaveBeenCalledWith(['/corporate']);
  }));
});
