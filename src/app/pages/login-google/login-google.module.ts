import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginGoogleRoutingModule } from './login-google-routing.module';
import { LoginGoogleComponent } from './login-google.component';

@NgModule({
  imports: [
    SocialLoginModule,
    CommonModule,
    LoginGoogleRoutingModule,
  ],
  declarations: [LoginGoogleComponent]
})
export class LoginGoogleModule { }
