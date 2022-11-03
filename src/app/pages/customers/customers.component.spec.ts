import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomersComponent } from './customers.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProductOwnerComponent } from './components/product-owner/product-owner.component';
import { CustomersProfileComponent } from './components/customers-profile/customers-profile.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageTooltipComponent } from 'src/app/shared/components/message-tooltip/message-tooltip.component';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';


describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersComponent, BreadcrumbComponent, CustomersProfileComponent,
        ProductOwnerComponent, InvoiceComponent, MessageTooltipComponent],
        imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [BsModalService, ComponentLoaderFactory, PositioningService]
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
