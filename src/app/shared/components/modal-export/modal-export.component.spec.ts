import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExportComponent } from './modal-export.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ModalExportComponent', () => {
  let component: ModalExportComponent;
  let fixture: ComponentFixture<ModalExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule, NgbModule],
      declarations: [ ModalExportComponent ],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
