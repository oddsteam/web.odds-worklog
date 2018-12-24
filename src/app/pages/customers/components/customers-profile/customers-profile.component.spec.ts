import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomersProfileComponent } from './customers-profile.component';


describe('CompanyProfileComponent', () => {
  let component: CustomersProfileComponent;
  let fixture: ComponentFixture<CustomersProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersProfileComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
