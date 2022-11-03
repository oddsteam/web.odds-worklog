import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceComponent } from './invoice.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
