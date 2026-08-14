import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolTipSiteComponent } from './components/tool-tip-site/tool-tip-site.component';
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule, SharedModule, UsersManagementRoutingModule, ProfileModule
  ],
  declarations: [UsersManagementComponent, ToolTipSiteComponent]
})
export class UsersManagementModule { }
