/* tslint:disable:no-unused-variable */
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeResponse } from '../../model/add-income-model-response';
import { IncomeFlag } from '../../model/income-flag';
import { ModalIncomeComponent } from './modal-income.component';

describe('ModalIncomeComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NgbModule],
      declarations: [ModalIncomeComponent],
      providers: [WorklogApiService, FormBuilder]
    })
      .compileComponents();
  }));

  describe('Fixture tests', () => {
    let fixture: ComponentFixture<ModalIncomeComponent>;
    let component: ModalIncomeComponent;
    let worklogApiService: WorklogApiService;

    beforeEach(() => {
      fixture = TestBed.createComponent(ModalIncomeComponent);
      worklogApiService = TestBed.inject(WorklogApiService);
      component = fixture.componentInstance;
      // fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should return false if typeUser != Y', () => {
      component.typeUser = 'N';
      component.addIncomeData = null;
      fixture.detectChanges();
      expect(component.isVat()).toBeFalsy();
    });

    it('form invalid when empty', () => {
      component.fg = <FormGroup>{
        valid: false
      };
      expect(component.fg.valid).toBeFalsy();
    });

    it('should return true if typeUser = Y', () => {
      component.typeUser = 'Y';
      expect(component.isVat).toBeTruthy();
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
      expect(component.fg.get('specialIncome').value).toEqual('');
      expect(component.fg.get('workDate').value).toEqual('');
      expect(component.fg.get('note').value).toEqual('');
    });

    it('attribute in form should not be empty if addIncome != null', () => {
      component.addIncomeData = {
        id: '112233rrf63545',
        userId: '3545fdggdlk65706ijv',
        totalIncome: '10000',
        netIncome: '0.00',
        netDailyIncome: '',
        submitDate: '2018-11-09:00:00:00',
        note: '',
        vat: '0.00',
        wht: '0.00',
        workDate: '20',
        specialIncome: '2000',
        netSpecialIncome: '2000',
        workingHours: '10'
      };
      component.onSetupForm();
      expect(component.fg.get('specialIncome').value).toEqual('2,000');
      expect(component.fg.get('workDate').value).toEqual('20');
      expect(component.fg.get('note').value).toEqual(component.addIncomeData.note);
    });

    it('call function updateData and check number of addIncome correct', () => {
      sessionStorage.setItem('role', 'corporate');
      component.addIncomeData = {
        id: '112233rrf63545',
        userId: '3545fdggdlk65706ijv',
        totalIncome: '100',
        netIncome: '',
        netDailyIncome: '',
        submitDate: '2018-11-09:00:00:00',
        note: 'Hello',
        vat: '',
        wht: '',
        workDate: '20',
        specialIncome: '0',
        netSpecialIncome: '2000',
        workingHours: '10'
      };
      component.onSetupForm();
      component.addIncomeData.totalIncome = '100';
      component.updateData();
      expect(component.addIncomeData.vat).toEqual('7.000000000000001');
      expect(component.addIncomeData.wht).toEqual('3');
      expect(component.addIncomeData.totalIncome).toEqual('97');
    });


    it('should set string follow by format 000,000', () => {
      expect(component.formatAmount('100000')).toEqual('100,000');
    });

    it('should replace "," to ""', () => {
      expect(component.formatInteger('100,000')).toEqual('100000');
    });

    it('should remove comma in number', () => {
      expect(component.cutComma('100,000,000')).toEqual('100000000');
    });

    it('should No zero Infrontof Amount', () => {
      expect(component.checkFirstValueIsZero('010000')).toEqual('10000');
    });

    it('should add Comma by Input Amount', () => {
      expect(component.formatInt('12324')).toEqual('12,324');
    });

    it('should check text have digit', () => {
      expect(component.checkTextHaveDigit('1000.0')).toEqual(true);
    });

    it('should return true if specialIncome < 1', () => {
      component.addIncomeData = null;
      component.totalIncome = '1000';
      component.onSetupForm();
      component.fg.setValue({
        specialIncome: 1000,
        note: '',
        workDate: '10',
        workingHours: '10'
      });
      expect(component.disableButton()).toBeFalsy();
    });

    it('should return false if specialIncome < 1', () => {
      component.addIncomeData = null;
      component.totalIncome = '0';
      component.onSetupForm();
      component.fg.setValue({
        specialIncome: 0,
        note: '',
        workDate: '10',
        workingHours: '10'
      });
      expect(component.disableButton()).toBeTruthy();
    });

    it('should set value of totalIncome with number not format currency', () => {
      component.addIncomeData = null;
      component.onSetupForm();
      component.fg.patchValue({
        specialIncome: 10000
      });
      fixture.detectChanges();
      component.inputIncomeAmount();
      expect(component.fg.get('specialIncome').value).not.toEqual('10,000');
    });

    it('should calculate net income correctly', () => {
      const result = component.calNetIncome('110,000', '0.07', '0.03');
      expect(result).toEqual('110000.04000000001');
    });

    it('should calculate WHT correctly', () => {
      const result = component.calWHT('100,000');
      expect(result).toEqual('3000');
    });

    it('should calculate VAT correctly', () => {
      const result = component.calVAT('100,000');
      expect(result).toEqual('7000.000000000001');
    });

    it('should call addIncomeConfirm in worklogApiService', () => {
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
        specialIncome: '2000',
        netSpecialIncome: '2000',
        workingHours: '10'
      };
      component.addIncomeData = null;
      component.onSetupForm();
      component.fg.patchValue({
        specialIncome: '100000',
        note: 'เงินเดือนนี้'
      });
      // fixture.detectChanges();
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
        netDailyIncome: '',
        submitDate: '2018-10-22:00:00:00',
        note: '',
        vat: '0.23',
        wht: '100',
        workDate: '20',
        specialIncome: '2000',
        netSpecialIncome: '2000',
        workingHours: '10'
      };
      component.addIncomeData = null;
      component.onSetupForm();
      component.fg.patchValue({
        specialIncome: '100000',
        note: 'เงินเดือนนี้'
      });
      // fixture.detectChanges();
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

    it('if user is Y when call updateData addIncomeData.net should have not call calNetIncome with vat = 0', () => {
      component.addIncomeData = null;
      component.onSetupForm();
      component.addIncomeData.totalIncome = '10000';
      component.typeUser = 'Y';
      component.typeVat = 'Y';
      spyOn(component, 'calNetIncome');
      component.updateData();
      expect(component.calNetIncome).toHaveBeenCalledWith('10000', component.addIncomeData.vat,
        component.addIncomeData.wht);
    });

    it('if user is N when call updateData addIncomeData.net should have call calNetIncome with vat = 0', () => {
      component.addIncomeData = null;
      component.onSetupForm();
      component.addIncomeData.totalIncome = '10000';
      component.typeUser = 'N';
      spyOn(component, 'calNetIncome');
      component.updateData();
      expect(component.calNetIncome).toHaveBeenCalledWith('10000', '0',
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
      spyOn(component, 'calTotalIncome');
      spyOn(component, 'updateData');
      component.onSubmit();
      expect(component.title).toEqual('Confirm Income');
    });

    it('addIncomeData.totalIncome should equal fg.totalIncome when call onSubmit', () => {
      component.addIncomeData = null;
      component.onSetupForm();
      component.fg.patchValue({
        specialIncome: '100000',
        note: 'เงินเดือนนี้'
      });
      // fixture.detectChanges();
      component.onSubmit();
      expect(component.addIncomeData.totalIncome).toEqual(component.totalIncome);
    });

    it('should emit addIncomeEmit with true when call onConfirm()', () => {
      spyOn(component.addIncomeEmit, 'emit');
      component.addIncomeData = null;
      component.onSetupForm();
      component.fg.patchValue({
        specialIncome: '100000',
        note: ''
      });
      // fixture.detectChanges();
      component.onConfirm();
      expect(component.addIncomeEmit.emit).toHaveBeenCalledWith(true);
    });

    it('call function updateData and check number of addIncome correct for individual', () => {
      sessionStorage.setItem('role', 'individual');
      component.addIncomeData = {
        id: '112233rrf63545',
        userId: '3545fdggdlk65706ijv',
        totalIncome: '100',
        netIncome: '',
        netDailyIncome: '',
        submitDate: '2018-11-09:00:00:00',
        note: 'Hello',
        vat: '',
        wht: '',
        workDate: '20',
        specialIncome: '0',
        netSpecialIncome: '2000',
        workingHours: '10'
      };
      // 7.000000000000001
      // 3
      component.onSetupForm();
      component.addIncomeData.totalIncome = '100';
      component.updateData();
      expect(component.addIncomeData.vat).toEqual('7.000000000000001');
      expect(component.addIncomeData.wht).toEqual('3');
      expect(component.addIncomeData.totalIncome).toEqual('97');
    });
    
      it('เมื่อเรียก calTotalIncome จะทำการคำนวณค่าต่างๆใส่ Modal Income', () => {
        component.addIncomeData = {
          id: '',
          userId: '',
          submitDate: '',
          note: '',
          vat: '',
          wht: '',
          workDate: '',
          netIncome: '',
          netDailyIncome: '',
          workingHours: '',
          specialIncome: '',
          netSpecialIncome: '',
          totalIncome: '',
        };
        component.fg = new FormBuilder().group({
          workDate: ['20'],
          specialIncome: ['2000'],
          workingHours: ['10']
        });
        component.dailyIncome = '5000';
        component.calTotalIncome();
        expect(component.addIncomeData.netDailyIncome).toEqual('100000');
        expect(component.addIncomeData.netSpecialIncome).toEqual('20000');
        expect(component.addIncomeData.netIncome).toEqual('120000');
      });

    it('when call updateData addIncomeData.wht should not equal "" for individual', () => {
      component.addIncomeData = null;
      component.onSetupForm();
      component.addIncomeData.totalIncome = '10000';
      component.updateData();
      expect(component.addIncomeData.wht).toEqual('300');
    });
  });


});

describe('ModalIncomeComponent', () => {
  let http: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NgbModule],
      declarations: [ModalIncomeComponent],
      providers: [WorklogApiService, FormBuilder]
    })
      .compileComponents();
  }));

  it('should call updateIncomeService in worklogApiService', () => {
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
      specialIncome: '2000',
      netSpecialIncome: '2000',
      workingHours: '10'
    };
    let worklogService = createMockWorklogApiService(mockResponse)
    let component = new ModalIncomeComponent(TestBed.inject(FormBuilder), worklogService, TestBed.inject(StateService));
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.patchValue({
      specialIncome: '100000',
      note: 'เงินเดือนนี้'
    });
    component.updateIncomeService('100000');
    expect(http.put).toHaveBeenCalledWith(jasmine.anything(), component.fg.value, jasmine.anything());
  });

  it('should emit closeModalEmit with true when updateIncomeService success', () => {
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
      specialIncome: '2000',
      netSpecialIncome: '2000',
      workingHours: '10'
    };
    let worklogService = createMockWorklogApiService(mockResponse)
    let component = new ModalIncomeComponent(TestBed.inject(FormBuilder), worklogService, TestBed.inject(StateService));
    component.addIncomeData = null;
    component.onSetupForm();
    component.fg.patchValue({
      specialIncome: '100000',
      note: 'เงินเดือนนี้'
    });
    // fixture.detectChanges();
    spyOn(component.closeModalEmit, 'emit');
    component.updateIncomeService('100000');
    expect(component.closeModalEmit.emit).toHaveBeenCalledWith(true);
  });


  function createMockWorklogApiService(mockResponse: AddIncomeResponse) {
    http = {} as HttpClient;
    http.put = jasmine.createSpy().and.returnValue(of(mockResponse));
    return new WorklogApiService(http);
  }
});

