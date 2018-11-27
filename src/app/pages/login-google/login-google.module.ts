import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGoogleComponent } from './login-google.component';
import { LoginGoogleRoutingModule } from './login-google-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginGoogleRoutingModule
  ],
  declarations: [LoginGoogleComponent]
})
export class LoginGoogleModule { }
