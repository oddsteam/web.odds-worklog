import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorLogsComponent } from './error-logs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorLogsRoutingModule } from './error-logs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ErrorLogsRoutingModule
  ],
  declarations: [ErrorLogsComponent]
})
export class ErrorLogsModule { }
