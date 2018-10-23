import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ListIncomeComponent } from './components/list-income/list-income.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';

@NgModule({
    imports: [
        CommonModule,LayoutsRoutingModule
    ],
    declarations: [LayoutsComponent, AddIncomeComponent, ListIncomeComponent, TabMenuComponent, ProfileComponent]
})
export class LayoutsModule { }
