import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetInboxComponent } from './timesheet-inbox.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimesheetInboxRoutingModule } from './timesheet-inbox-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TimesheetInboxRoutingModule
  ],
  declarations: [TimesheetInboxComponent]
})
export class TimesheetInboxModule { }
