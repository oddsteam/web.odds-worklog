import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateModule } from '../pages/corporate/corporate.module';
import { IndividualModule } from '../pages/individual/individual.module';
import { SharedModule } from '../shared/shared.module';
import { AddIncomeModalComponent } from './components/add-income/add-income-modal/add-income-modal.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ConfirmIncomeModalComponent } from './components/add-income/confirm-income-modal/confirm-income-modal.component';
import { ListIncomeComponent } from './components/list-income/list-income.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { TabMenuComponent } from '../shared/components/tab-menu/tab-menu.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        LayoutsRoutingModule,
        SharedModule,
        CorporateModule,
        IndividualModule
    ],
    declarations: [
        LayoutsComponent,
        AddIncomeComponent,
        ListIncomeComponent,
        ProfileComponent,
        AddIncomeModalComponent,
        ConfirmIncomeModalComponent
    ],
    entryComponents: [
        AddIncomeModalComponent,
        ConfirmIncomeModalComponent
    ]
})
export class LayoutsModule { }
