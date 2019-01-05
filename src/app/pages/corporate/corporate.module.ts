import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateComponent } from './corporate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCorporateComponent } from './components/list-corporate/list-corporate.component';
import { CorporateRoutingModule } from './corporate-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CorporateRoutingModule
  ],
  declarations: [
    CorporateComponent,
    ListCorporateComponent,
  ]
})
export class CorporateModule { }
