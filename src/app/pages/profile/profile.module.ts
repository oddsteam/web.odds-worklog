import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [
        CommonModule, SharedModule
    ],
    declarations: [ProfileComponent],
    exports: [ProfileComponent]
})
export class ProfileModule { }
