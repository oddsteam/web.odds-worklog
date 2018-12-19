import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { NgModule } from '@angular/core';
import { ProductOwnerComponent } from './components/product-owner/product-owner.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
