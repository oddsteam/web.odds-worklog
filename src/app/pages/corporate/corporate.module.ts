import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateComponent } from './corporate.component';
import { ListIncomeCorporateComponent } from './components/list-income-corporate/list-income-corporate.component';
import { AddIncomeCorporateComponent } from './components/add-income-corporate/add-income-corporate.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CorporateComponent,
    ListIncomeCorporateComponent,
    AddIncomeCorporateComponent
  ]
})
export class CorporateModule { }
