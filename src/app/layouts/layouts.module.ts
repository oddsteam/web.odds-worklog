import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateModule } from '../pages/corporate/corporate.module';
import { IndividualModule } from '../pages/individual/individual.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutsComponent } from './layouts.component';
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
        ProfileComponent
    ]
})
export class LayoutsModule { }
