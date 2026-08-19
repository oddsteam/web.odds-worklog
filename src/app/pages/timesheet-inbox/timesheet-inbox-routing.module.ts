import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetInboxComponent } from './timesheet-inbox.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetInboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetInboxRoutingModule { }
