import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableListUserBySiteComponent } from './component/table-list-user-by-site/table-list-user-by-site.component';
import { GroupManagementComponent } from './group-management.component';
import { GroupManagementRoutingModule } from './group-management-routing.module';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, GroupManagementRoutingModule
  ],
  declarations: [GroupManagementComponent, TableListUserBySiteComponent]
})
export class GroupManagementModule { }
