import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomersComponent } from './customers.component';
import { ProductOwnerComponent } from './components/product-owner/product-owner.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersProfileComponent } from './components/customers-profile/customers-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, SharedModule, CustomersRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [CustomersComponent, ProductOwnerComponent, BreadcrumbComponent, CustomersProfileComponent]
})
export class CustomersModule { }
