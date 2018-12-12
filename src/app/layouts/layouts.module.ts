import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateModule } from '../pages/corporate/corporate.module';
import { GrouopManagementModule } from '../pages/group-management/group-management.module';
import { IndividualModule } from '../pages/individual/individual.module';
import { SettingModule } from '../pages/setting/setting.module';
import { UsersManagementModule } from '../pages/users-management/users-management.module';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        LayoutsRoutingModule,
        SharedModule,
        CorporateModule,
        IndividualModule,
        UsersManagementModule,
        SettingModule,
        GrouopManagementModule
    ],
    declarations: [
        LayoutsComponent,
        ProfileComponent,
    ]
})
export class LayoutsModule { }
