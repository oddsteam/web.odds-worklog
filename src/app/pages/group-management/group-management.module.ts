import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableListUserBySiteComponent } from './component/table-list-user-by-site/table-list-user-by-site.component';
import { GroupManagementComponent } from './group-management.component';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [GroupManagementComponent, TableListUserBySiteComponent]
})
export class GrouopManagementModule { }
