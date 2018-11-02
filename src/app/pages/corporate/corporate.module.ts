import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateComponent } from './corporate.component';
import { ListIncomeCorporateComponent } from './components/list-income-corporate/list-income-corporate.component';
import { AddIncomeCorporateComponent } from './components/add-income-corporate/add-income-corporate.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    CorporateComponent,
    ListIncomeCorporateComponent,
    AddIncomeCorporateComponent
  ]
})
export class CorporateModule { }
