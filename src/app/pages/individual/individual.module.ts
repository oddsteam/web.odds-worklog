import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndividualComponent } from './individual.component';
import { ListIndividualComponent } from './components/list-individual/list-individual.component';
import { AddIncomeIndividualComponent } from './components/add-income-individual/add-income-individual.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    IndividualComponent,
    ListIndividualComponent,
    AddIncomeIndividualComponent
  ]
})
export class IndividualModule { }
