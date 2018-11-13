/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, ComponentLoaderFactory, PositioningService, BsModalRef } from 'ngx-bootstrap';
import { ModalIncomeComponent } from 'src/app/shared/components/modal-income/modal-income.component';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { AddIncomeIndividualComponent } from './add-income-individual.component';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { throwError, of } from 'rxjs';


describe('AddIncomeIndividualComponent', () => {
  let component: AddIncomeIndividualComponent;
  let fixture: ComponentFixture<AddIncomeIndividualComponent>;
  let worklogservice: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddIncomeIndividualComponent, ModalIncomeComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, NgbModule.forRoot()],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncomeIndividualComponent);
    worklogservice = TestBed.get(WorklogApiService);
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

  it('should call closeModal if event = true', () => {
    const event = true;
    spyOn(component, 'closeModal');
    component.closeModalEvent(event);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should not call closeModal if event = false', () => {
    const event = false;
    spyOn(component, 'closeModal');
    component.closeModalEvent(event);
    expect(component.closeModal).not.toHaveBeenCalled();
  });

});
