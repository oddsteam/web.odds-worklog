import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ListIncomeComponent } from './components/list-income/list-income.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { SharedModule } from '../shared/shared.module';
import { AddIncomeModalComponent } from './components/add-income/add-income-modal/add-income-modal.component';
import { ConfirmIncomeModalComponent } from './components/add-income/confirm-income-modal/confirm-income-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateComponent } from '../pages/corporate/corporate.component';
import { CorporateModule } from '../pages/corporate/corporate.module';
import { IndividualModule } from '../pages/individual/individual.module';

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
        TabMenuComponent,
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
