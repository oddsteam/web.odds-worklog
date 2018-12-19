import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyComponent } from './company.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProductOwnerComponent } from './components/product-owner/product-owner.component';


describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyComponent, BreadcrumbComponent, CompanyProfileComponent,
        ProductOwnerComponent, InvoiceComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
