import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIncomeComponent } from './my-income.component';

describe('MyIncomeComponent', () => {
  let component: MyIncomeComponent;
  let fixture: ComponentFixture<MyIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
