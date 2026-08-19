import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TimesheetEventLog } from 'src/app/shared/model/timesheet-event-log';

@Component({
  selector: 'app-timesheet-inbox',
  templateUrl: './timesheet-inbox.component.html',
  styleUrls: ['./timesheet-inbox.component.scss']
})
export class TimesheetInboxComponent implements OnInit {
  logs: TimesheetEventLog[] = [];
  loadError: string | null = null;
  loading = true;

  constructor(private worklogApi: WorklogApiService) { }

  ngOnInit(): void {
    this.worklogApi.getTimesheetEventLogs(100).subscribe({
      next: (rows) => {
        this.logs = rows ?? [];
        this.loading = false;
        this.loadError = null;
      },
      error: () => {
        this.loading = false;
        this.loadError = 'Unable to load the transactional inbox. The server may be unavailable.';
      }
    });
  }

  totalWorkingDays(log: TimesheetEventLog): number {
    return (log.sites ?? []).reduce((sum, site) => sum + (site.workingDays ?? 0), 0);
  }

  totalOvertimeDays(log: TimesheetEventLog): number {
    return (log.sites ?? []).reduce((sum, site) => sum + (site.overtimeDays ?? 0), 0);
  }
}
