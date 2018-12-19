import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ],
    declarations: [
        LayoutsComponent,
        ProfileComponent,
    ]
})
export class LayoutsModule { }
