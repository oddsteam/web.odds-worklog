import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstLoginComponent } from './first-login.component';


const routes: Routes = [
  {
    path: '',
    component: FirstLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstLoginRoutingModule { }
