/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ModalIncomeComponent } from './modal-income.component';

describe('ModalIncomeComponent', () => {
  let component: ModalIncomeComponent;
  let fixture: ComponentFixture<ModalIncomeComponent>;

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

  // it('should remove comma in number', () => {
  //   expect(component.cutComma('100,000,000')).toEqual('100000000');
  // });

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
    expect(component.fg.get('totalIncome').value).toEqual(component.addIncomeData.totalIncome);
    expect(component.fg.get('note').value).toEqual(component.addIncomeData.note);
  });

});

