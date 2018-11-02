import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddIncomeIndividualComponent } from './components/add-income-individual/add-income-individual.component';
import { ListIncomeIndividualComponent } from './components/list-income-individual/list-income-individual.component';
import { IndividualComponent } from './individual.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    IndividualComponent,
    ListIncomeIndividualComponent,
    AddIncomeIndividualComponent
  ]
})
export class IndividualModule { }
