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

});

