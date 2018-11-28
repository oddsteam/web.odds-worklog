import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FirstLoginRoutingModule } from './first-login-routing.module';
import { FirstLoginComponent } from './first-login.component';

@NgModule({
  imports: [
    CommonModule, FirstLoginRoutingModule, ReactiveFormsModule
  ],
  declarations: [FirstLoginComponent]
})
export class FirstLoginModule { }
