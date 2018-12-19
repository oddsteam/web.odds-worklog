import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyComponent } from './company.component';
import { ProductOwnerComponent } from './components/product-owner/product-owner.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  imports: [
    CommonModule, SharedModule, CompanyRoutingModule
  ],
  declarations: [CompanyComponent, ProductOwnerComponent, InvoiceComponent, BreadcrumbComponent, CompanyProfileComponent]
})
export class CompanyModule { }
