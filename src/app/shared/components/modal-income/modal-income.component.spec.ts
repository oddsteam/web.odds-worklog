/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalIncomeComponent } from './modal-income.component';

describe('ModalIncomeComponent', () => {
  let component: ModalIncomeComponent;
  let fixture: ComponentFixture<ModalIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalIncomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { AddIncomeModalComponent } from './add-income-modal.component';


// describe('AddIncomeModalComponent', () => {
//     let component: AddIncomeModalComponent;
//     let fixture: ComponentFixture<AddIncomeModalComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [AddIncomeModalComponent],
//             imports: [FormsModule],
//             providers: [NgbActiveModal]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(AddIncomeModalComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });



// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateModule } from '@ngx-translate/core';
// import { ConfirmIncomeModalComponent } from './confirm-income-modal.component';


// describe('ConfirmIncomeModalComponent', () => {
//     let component: ConfirmIncomeModalComponent;
//     let fixture: ComponentFixture<ConfirmIncomeModalComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ConfirmIncomeModalComponent],
//             imports: [NgbModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
//             providers: [
//                 NgbActiveModal]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ConfirmIncomeModalComponent);
//         component = fixture.componentInstance;
//         // fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('', () => {
//         const netIncome = '100';
//         const vat = '7';
//         const wht = '3';
//         expect(component.calNetIncome(netIncome, vat, wht)).toEqual('104');
//     });

//     it('', () => {
//         const inputNumber = '1000';
//         expect(component.stringToNumber(inputNumber)).toEqual(1000);
//     });
// });

