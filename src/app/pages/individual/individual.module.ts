import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndividualComponent } from './individual.component';
import { ListIndividualComponent } from './components/list-individual/list-individual.component';
import { IndividualRoutingModule } from './individual-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IndividualRoutingModule
  ],
  declarations: [
    IndividualComponent,
    ListIndividualComponent,
  ]
})
export class IndividualModule { }
