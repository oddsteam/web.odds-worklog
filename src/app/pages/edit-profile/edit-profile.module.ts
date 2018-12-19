import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProfileComponent } from './edit-profile.component';
import { EditProfileRoutingModule } from './edit-profile-routing.module';

@NgModule({
    imports: [
        CommonModule, SharedModule, EditProfileRoutingModule
    ],
    declarations: [EditProfileComponent]
})
export class EditProfileModule { }

