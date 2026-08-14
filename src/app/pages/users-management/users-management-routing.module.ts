import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { UsersManagementComponent } from './users-management.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent
  },
  {
    path: ':id',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
