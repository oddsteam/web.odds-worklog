import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProfileComponent } from './edit-profile.component';

@NgModule({
    imports: [
        CommonModule, SharedModule,
    ],
    declarations: [EditProfileComponent]
})
export class EditProfileModule { }

