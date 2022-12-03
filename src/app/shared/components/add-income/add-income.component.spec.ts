import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddIncomeComponent } from './add-income.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { of, throwError } from 'rxjs';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('AddIncomeComponent', () => {
  let component: AddIncomeComponent;
  let fixture: ComponentFixture<AddIncomeComponent>;
  let worklogservice: WorklogApiService;
  let modalService: BsModalService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddIncomeComponent],
      imports: [HttpClientTestingModule],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService, WorklogApiService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncomeComponent);
    worklogservice = TestBed.inject(WorklogApiService);
    modalService = TestBed.inject(BsModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIncomeByUserID in worklog service', () => {
    const mockResponse: AddIncomeResponse = {
      id: '01',
      userId: '0000022233',
      totalIncome: '100000',
      netIncome: '40',
      netDailyIncome: '',
      submitDate: '2018-10-22:00:00:00',
      note: '',
      vat: '0.23',
      wht: '100',
      workDate: '20',
      specialIncome: '100',
      netSpecialIncome: '2000',
      workingHours: '10'
    };
    spyOn(worklogservice, 'getIncomeByUserID').and.returnValue(of(mockResponse));
    component.checkStatusUser();
    expect(worklogservice.getIncomeByUserID).toHaveBeenCalled();
  });

  it('addIncomeResponse should be equal data from service if getIncomeByUserID is not error', () => {
    const mockResponse: AddIncomeResponse = {
      id: '01',
      userId: '0000022233',
      totalIncome: '100000',
      netIncome: '40',
      netDailyIncome: '',
      submitDate: '2018-10-22:00:00:00',
      note: '',
      vat: '0.23',
      wht: '100',
      workDate: '20',
      specialIncome: '100',
      netSpecialIncome: '2000',
      workingHours: '10'

    };
    spyOn(worklogservice, 'getIncomeByUserID').and.returnValue(of(mockResponse));
    component.checkStatusUser();
    expect(component.addIncomeResponse).toEqual(mockResponse);
  });

  it('addIncomeResponse should be null if getIncomeByUserID is error', () => {
    spyOn(worklogservice, 'getIncomeByUserID').and.callFake(() => {
      return throwError(new Error('Fake error'));
    });
    component.checkStatusUser();
    expect(component.addIncomeResponse).toBeNull();
  });

  it('should call openModal', () => {
    spyOn(component, 'openModal');
    component.openTemplateModal();
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should emit addIncomeAlready with true if event is true', () => {
    spyOn(component.addIncomeAlready, 'emit');
    component.addIncomeEmit(true);
    expect(component.addIncomeAlready.emit).toHaveBeenCalledWith(true);
  });

  it('should emit addIncomeAlready with false if event is undefined', () => {
    spyOn(component.addIncomeAlready, 'emit');
    component.addIncomeEmit(undefined);
    expect(component.addIncomeAlready.emit).toHaveBeenCalledWith(false);
  });
});
