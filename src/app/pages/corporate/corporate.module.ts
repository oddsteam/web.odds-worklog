import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateComponent } from './corporate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCorporateComponent } from './components/list-corporate/list-corporate.component';
import { AddIncomeCorporateComponent } from './components/add-income-corporate/add-income-corporate.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    CorporateComponent,
    ListCorporateComponent,
    AddIncomeCorporateComponent,
  ]
})
export class CorporateModule { }
