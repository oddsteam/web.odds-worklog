import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomeIndividualComponent } from './add-income-individual.component';

describe('AddIncomeIndividualComponent', () => {
  let component: AddIncomeIndividualComponent;
  let fixture: ComponentFixture<AddIncomeIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncomeIndividualComponent ]
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
