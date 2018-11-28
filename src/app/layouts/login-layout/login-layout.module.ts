import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginLayoutRoutingModule } from './login-layout-routing.module';
import { LoginLayoutComponent } from './login-layout.component';

@NgModule({
  imports: [
    CommonModule,
    LoginLayoutRoutingModule
  ],
  declarations: [LoginLayoutComponent]
})
export class LoginLayoutModule { }
