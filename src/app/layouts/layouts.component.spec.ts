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
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { TabMenuComponent } from '../shared/components/tab-menu/tab-menu.component';
import { LayoutsComponent } from './layouts.component';

class MockRouterService {
  navigate() { }
}
const mockRouterService = new MockRouterService();

describe('LayoutsComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;
  let worklogApiService: WorklogApiService;
  // let mockUsers: Users;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutsComponent, TabMenuComponent, ProfileComponent, AddIncomeComponent, ModalIncomeComponent],
      imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule
        , TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })],
      providers: [WorklogApiService, StateService,
        {
          provide: Router,
          useValue: mockRouterService,
        }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsComponent);
    worklogApiService = TestBed.get(WorklogApiService);
    component = fixture.componentInstance;
    // mockUsers = <Users>{
    //   id: '1234567890',
    //   role: 'corporate',
    //   fullnameEn: 'ทดสอบ ชอบลงทุน',
    //   email: 'abc@abc.com',
    //   bankAccountName: 'ทดสอบ ชอบลงทุน',
    //   bankAccountNumber: '0987654321',
    //   thaiCitizenId: '1234567890',
    // };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call method getLogin to Have Been Called worklogApiService getUserById ', () => {
  //   spyOn(worklogApiService, 'getLogin').and.returnValues(of(mockUsers));
  //   component.ngOnInit();
  //   expect(worklogApiService.getLogin).toHaveBeenCalled();
  // });

  // it('should sessionStorage token equal by response from worklogApiService', () => {
  //   const mockToken = {
  //     token: '.eyJ1c2VySWQiOiJbyZVcdWZmZmQ6Mlx1MDAwNFx1ZmZmZGBcdWZmZmRcclx1ZmZ'
  //   };
  //   spyOn(worklogApiService, 'getLogin').and.returnValues(of(mockToken));
  //   component.ngOnInit();
  //   expect(sessionStorage.getItem('token')).toEqual('Bearer ' + mockToken.token);
  // });

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
