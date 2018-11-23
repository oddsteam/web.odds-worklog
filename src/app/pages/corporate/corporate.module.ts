import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateComponent } from './corporate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCorporateComponent } from './components/list-corporate/list-corporate.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    CorporateComponent,
    ListCorporateComponent,
  ]
})
export class CorporateModule { }
