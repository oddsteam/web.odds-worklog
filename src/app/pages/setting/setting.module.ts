import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SettingRoutingModule
    ],
    declarations: [
        SettingComponent
    ]
})
export class SettingModule { }
