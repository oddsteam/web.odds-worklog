import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { SapExportFailureLog } from 'src/app/shared/model/sap-export-failure-log';

@Component({
  selector: 'app-error-logs',
  templateUrl: './error-logs.component.html',
  styleUrls: ['./error-logs.component.scss']
})
export class ErrorLogsComponent implements OnInit {
  logs: SapExportFailureLog[] = [];
  loadError: string | null = null;
  loading = true;

  constructor(private worklogApi: WorklogApiService) { }

  ngOnInit(): void {
    this.worklogApi.getSapExportFailures(100).subscribe({
      next: (rows) => {
        this.logs = rows ?? [];
        this.loading = false;
        this.loadError = null;
      },
      error: () => {
        this.loading = false;
        this.loadError = 'Unable to load error logs. You may not have permission or the server failed.';
      }
    });
  }
}
