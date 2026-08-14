import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileModule } from './profile.module';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [ProfileModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
