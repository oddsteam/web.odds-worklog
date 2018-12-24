import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomersComponent } from './customers.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProductOwnerComponent } from './components/product-owner/product-owner.component';
import { CustomersProfileComponent } from './components/customers-profile/customers-profile.component';


describe('CompanyComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersComponent, BreadcrumbComponent, CustomersProfileComponent,
        ProductOwnerComponent, InvoiceComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
