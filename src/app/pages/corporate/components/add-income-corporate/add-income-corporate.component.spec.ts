import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddIncomeCorporateComponent } from './add-income-corporate.component';
import { NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { BsModalService, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { StateService } from 'src/app/core/state.service';
import { of, throwError } from 'rxjs';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';

describe('AddIncomeCorporateComponent', () => {
  let component: AddIncomeCorporateComponent;
  let fixture: ComponentFixture<AddIncomeCorporateComponent>;
  let worklogservice: WorklogApiService;
  let modalService: BsModalService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddIncomeCorporateComponent],
      imports: [HttpClientTestingModule],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService, WorklogApiService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncomeCorporateComponent);
    worklogservice = TestBed.get(WorklogApiService);
    modalService = TestBed.get(BsModalService);
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
      submitDate: '2018-10-22:00:00:00',
      note: '',
      vat: '0.23',
      wht: '100'
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
      submitDate: '2018-10-22:00:00:00',
      note: '',
      vat: '0.23',
      wht: '100'
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

});
