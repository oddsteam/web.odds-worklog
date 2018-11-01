import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualComponent } from './individual.component';
import { ListIncomeIndividualComponent } from './components/list-income-individual/list-income-individual.component';
import { AddIncomeIndividualComponent } from './components/add-income-individual/add-income-individual.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IndividualComponent,
    ListIncomeIndividualComponent,
    AddIncomeIndividualComponent
  ]
})
export class IndividualModule { }
