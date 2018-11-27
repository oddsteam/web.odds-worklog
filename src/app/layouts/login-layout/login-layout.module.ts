import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginLayoutRoutingModule } from './login-layout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginLayoutRoutingModule
  ],
  declarations: [LoginLayoutComponent]
})
export class LoginLayoutModule { }
