import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateModule } from '../pages/corporate/corporate.module';
import { IndividualModule } from '../pages/individual/individual.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutsComponent } from './layouts.component';
import { TabMenuComponent } from '../shared/components/tab-menu/tab-menu.component';
import { AddIncomeModalComponent } from '../shared/components/modal/add-income-modal/add-income-modal.component';
import { ConfirmIncomeModalComponent } from '../shared/components/modal/confirm-income-modal/confirm-income-modal.component';
import { ListIncomeComponent } from '../shared/components/list-income/list-income.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { LayoutsRoutingModule } from './layouts-routing.module';

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
