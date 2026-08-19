export interface TimesheetEmployee {
  email: string;
  englishName: string;
}

export interface TimesheetSiteSummary {
  clientSite: string;
  customerName: string;
  workingDays: number;
  overtimeDays: number;
}

export interface TimesheetEventLog {
  id?: string;
  eventType: string;
  year: number;
  month: number;
  summaryAt: string;
  employee: TimesheetEmployee;
  sites: TimesheetSiteSummary[];
  receivedAt: string;
}
