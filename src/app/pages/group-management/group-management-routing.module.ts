import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupManagementComponent } from './group-management.component';
import { TableListUserBySiteComponent } from './component/table-list-user-by-site/table-list-user-by-site.component';


const routes: Routes = [
  {
    path: ':id',
    component: GroupManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupManagementRoutingModule { }
