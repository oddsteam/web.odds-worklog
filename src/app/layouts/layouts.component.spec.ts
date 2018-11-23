import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { StateService } from '../core/state.service';
import { WorklogApiService } from '../core/worklog-api.service';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { TabMenuComponent } from '../shared/components/tab-menu/tab-menu.component';
import { Users } from '../shared/model/user-model';
import { LayoutsComponent } from './layouts.component';
import { AddIncomeComponent } from '../shared/components/add-income/add-income.component';
import { ModalIncomeComponent } from '../shared/components/modal-income/modal-income.component';
import { SharedModule } from '../shared/shared.module';


describe('LayoutsComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;
  let worklogApiService: WorklogApiService;
  let stateService: StateService;
  let mockUsers: Users;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutsComponent, TabMenuComponent, ProfileComponent, AddIncomeComponent],
      imports: [CommonModule, FormsModule, RouterTestingModule, HttpClientTestingModule
        , TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })],
      providers: [WorklogApiService, StateService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsComponent);
    worklogApiService = TestBed.get(WorklogApiService);
    stateService = TestBed.get(StateService);
    component = fixture.componentInstance;
    mockUsers = <Users>{
      id: '1234567890',
      fullnameEn: 'ทดสอบ ชอบลงทุน',
      email: 'abc@abc.com',
      bankAccountName: 'ทดสอบ ชอบลงทุน',
      bankAccountNumber: '0987654321',
      corporateFlag: 'Y',
      thaiCitizenId: '1234567890',
    };
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should call method getUserByID to Have Been Called worklogApiService getUserById ', () => {
  //   spyOn(worklogApiService, 'getUserByID').and.returnValues(of(mockUsers));
  //   component.getUserByID();
  //   expect(worklogApiService.getUserByID).toHaveBeenCalled();

  // });

  // it('should call method setFlagUsers to Have Been Called stateService setFlagUser', () => {
  //   spyOn(stateService, 'setFlagUser');
  //   expect(stateService.setFlagUser).toHaveBeenCalled();
  // });
});
