import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCorporateComponent } from './list-corporate.component';

describe('ListCorporateComponent', () => {
  let component: ListCorporateComponent;
  let fixture: ComponentFixture<ListCorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
