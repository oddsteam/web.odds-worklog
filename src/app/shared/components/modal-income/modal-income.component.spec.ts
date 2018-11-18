/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ModalIncomeComponent } from './modal-income.component';
import { of } from 'rxjs';
import { AddIncomeResponse } from '../../model/add-income-model-response';
import { IncomeFlag } from '../../model/income-flag';

describe('ModalIncomeComponent', () => {
  let component: ModalIncomeComponent;
  let fixture: ComponentFixture<ModalIncomeComponent>;
  let worklogApiService: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NgbModule.forRoot()],
      declarations: [ModalIncomeComponent],
      providers: [WorklogApiService, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIncomeComponent);
    worklogApiService = TestBed.get(WorklogApiService);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.fg = <FormGroup>{
      valid: false
    };
    expect(component.fg.valid).toBeFalsy();
  });

  it('should return true if typeUser = corporate', () => {
    component.typeUser = 'corporate';
    expect(component.isVat).toBeTruthy();
  });

  it('should return false if typeUser != corporate', () => {
    component.typeUser = 'individual';
    component.addIncomeData = null;
    fixture.detectChanges();
    expect(component.isVat()).toBeFalsy();
  });

  it('addIncomeAlready should be false when call onCancel()', () => {
    component.onCancel();
    expect(component.addIncomeAlready).toBeFalsy();
  });

  it('title should equal "Add Income" when call onCancel()', () => {
    component.onCancel();
    expect(component.title).toEqual('Add Income');
  });

  it('should emit closeModalEmit when call closeModal()', () => {
    spyOn(component.closeModalEmit, 'emit');
    component.closeModal();
    expect(component.closeModalEmit.emit).toHaveBeenCalled();
    expect(component.closeModalEmit.emit).toHaveBeenCalledWith(true);
  });

  it('should convert string to number', () => {
    expect(component.stringToNumber('100,000,000')).toEqual(100000000);
  });

  it('attribute in form should be empty if addIncome = null', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    expect(component.fg.get('totalIncome').value).toEqual('');
    expect(component.fg.get('note').value).toEqual('');
  });

  it('attribute in form should not be empty if addIncome != null', () => {
    component.addIncomeData = {
      id: '112233rrf63545',
      userId: '3545fdggdlk65706ijv',
      totalIncome: '10000',
      netIncome: '0.00',
      submitDate: '2018-11-09:00:00:00',
      note: '',
      vat: '0.00',
      wht: '0.00',
    };
    component.onSetupForm();
    expect(component.fg.get('totalIncome').value).toEqual('10,000');
    expect(component.fg.get('note').value).toEqual(component.addIncomeData.note);
  });

  it('call function updateData and check number of addIncome correct', () => {
    component.addIncomeData = {
      id: '112233rrf63545',
      userId: '3545fdggdlk65706ijv',
      totalIncome: '100',
      netIncome: '',
      submitDate: '2018-11-09:00:00:00',
      note: 'Hello',
      vat: '',
      wht: '',
    };
    // 7.000000000000001
    // 3
    component.updateData();
    expect(component.addIncomeData.vat).toEqual('7.000000000000001');
    expect(component.addIncomeData.wht).toEqual('3');
    expect(component.addIncomeData.netIncome).toEqual('97');
  });

  it('should set string follow by format 000,000', () => {
    expect(component.formatCurrency('100000')).toEqual('100,000');
  });

  it('should replace "," to ""', () => {
    expect(component.formatInteger('100,000')).toEqual('100000');
  });

  it('should remove comma in number', () => {
    expect(component.cutComma('100,000,000')).toEqual('100000000');
  });

  it('should return true if totalIncome < 1', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.setValue({
      totalIncome: 1000,
      note: ''
    });
    expect(component.disableButton()).toBeFalsy();
  });

  it('should return false if totalIncome < 1', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.setValue({
      totalIncome: 0,
      note: ''
    });
    expect(component.disableButton()).toBeTruthy();
  });

  it('should set value of totalIncome with number not format currency', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.patchValue({
      totalIncome: 10000
    });
    fixture.detectChanges();
    component.inputIncomeAmount();
    expect(component.totalIncome.value).not.toEqual('10,000');
  });

  it('should calculate net income correctly', () => {
    const result = component.calNetIncome('100,000', '0.07', '0.03');
    expect(result).toEqual('100000.04000000001');
  });

  it('should calculate WHT correctly', () => {
    const result = component.calWHT('100,000');
    expect(result).toEqual('3000');
  });

  it('should calculate VAT correctly', () => {
    const result = component.calVAT('100,000');
    expect(result).toEqual('7000.000000000001');
  });

  it('should call updateIncomeService in worklogApiService', () => {
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
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.patchValue({
      totalIncome: '100000',
      note: 'เงินเดือนนี้'
    });
    fixture.detectChanges();
    spyOn(worklogApiService, 'updateIncomeService').and.returnValue(of(mockResponse));
    component.updateIncomeService('100000');
    expect(worklogApiService.updateIncomeService).toHaveBeenCalledWith(component.fg.value);
  });

  it('should emit closeModalEmit with true when updateIncomeService success', () => {
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
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.patchValue({
      totalIncome: '100000',
      note: 'เงินเดือนนี้'
    });
    fixture.detectChanges();
    spyOn(worklogApiService, 'updateIncomeService').and.returnValue(of(mockResponse));
    spyOn(component.closeModalEmit, 'emit');
    component.updateIncomeService('100000');
    expect(component.closeModalEmit.emit).toHaveBeenCalledWith(true);
  });

  it('should call addIncomeConfirm in worklogApiService', () => {
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
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.patchValue({
      totalIncome: '100000',
      note: 'เงินเดือนนี้'
    });
    fixture.detectChanges();
    spyOn(worklogApiService, 'addIncomeConfirm').and.returnValue(of(mockResponse));
    component.addIncomeConfirm('100000');
    expect(worklogApiService.addIncomeConfirm).toHaveBeenCalledWith(component.fg.value);
  });

  it('should emit closeModalEmit with true when addIncomeConfirm success', () => {
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
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.patchValue({
      totalIncome: '100000',
      note: 'เงินเดือนนี้'
    });
    fixture.detectChanges();
    spyOn(worklogApiService, 'addIncomeConfirm').and.returnValue(of(mockResponse));
    spyOn(component.closeModalEmit, 'emit');
    component.addIncomeConfirm('100000');
    expect(component.closeModalEmit.emit).toHaveBeenCalledWith(true);
  });

  it('when call updateData addIncomeData.vat should not equal "" ', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.addIncomeData.totalIncome = '10000';
    component.updateData();
    expect(component.addIncomeData.vat).toEqual('700.0000000000001');
  });

  it('when call updateData addIncomeData.wht should not equal "" ', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.addIncomeData.totalIncome = '10000';
    component.updateData();
    expect(component.addIncomeData.wht).toEqual('300');
  });

  it('if user is corporate when call updateData addIncomeData.net should have not call calNetIncome with vat = 0', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.addIncomeData.totalIncome = '10000';
    component.typeUser = 'corporate';
    spyOn(component, 'calNetIncome');
    component.updateData();
    expect(component.calNetIncome).toHaveBeenCalledWith(component.addIncomeData.totalIncome, component.addIncomeData.vat,
      component.addIncomeData.wht);
  });

  it('if user is individual when call updateData addIncomeData.net should have call calNetIncome with vat = 0', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.addIncomeData.totalIncome = '10000';
    component.typeUser = 'individual';
    spyOn(component, 'calNetIncome');
    component.updateData();
    expect(component.calNetIncome).toHaveBeenCalledWith(component.addIncomeData.totalIncome, '0',
      component.addIncomeData.wht);
  });

  it('when IncomeFlag.isUpdate = true it should call updateIncomeService', () => {
    IncomeFlag.isUpdate = true;
    component.addIncomeData = null;
    component.onSetupForm();
    spyOn(component, 'updateIncomeService');
    component.onConfirm();
    expect(component.updateIncomeService).toHaveBeenCalled();
  });

  it('when IncomeFlag.isUpdate = false it should call addIncomeConfirm', () => {
    IncomeFlag.isUpdate = false;
    component.addIncomeData = null;
    component.onSetupForm();
    spyOn(component, 'addIncomeConfirm');
    component.onConfirm();
    expect(component.addIncomeConfirm).toHaveBeenCalled();
  });

  it('title should equal Confirm Income when call onSubmit', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.onSubmit();
    expect(component.title).toEqual('Confirm Income');
  });

  it('addIncomeData.totalIncome should equal fg.totalIncome when call onSubmit', () => {
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.patchValue({
      totalIncome: '100000',
      note: 'เงินเดือนนี้'
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(component.addIncomeData.totalIncome).toEqual(component.totalIncome.value);
  });
});

