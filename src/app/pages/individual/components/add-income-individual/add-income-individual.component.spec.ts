/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { ModalIncomeComponent } from 'src/app/shared/components/modal-income/modal-income.component';
import { AddIncomeIndividualComponent } from './add-income-individual.component';


describe('AddIncomeIndividualComponent', () => {
  let component: AddIncomeIndividualComponent;
  let fixture: ComponentFixture<AddIncomeIndividualComponent>;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
