import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLoginComponent } from './first-login.component';
import { FirstLoginRoutingModule } from './first-login-routing.module';

@NgModule({
  imports: [
    CommonModule, FirstLoginRoutingModule
  ],
  declarations: [FirstLoginComponent]
})
export class FirstLoginModule { }
