import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { TimesheetInboxComponent } from './timesheet-inbox.component';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TimesheetEventLog } from 'src/app/shared/model/timesheet-event-log';

describe('TimesheetInboxComponent', () => {
  let component: TimesheetInboxComponent;
  let fixture: ComponentFixture<TimesheetInboxComponent>;
  let worklogService: WorklogApiService;

  const mockLog: TimesheetEventLog = {
    id: '1',
    eventType: 'timesheet.monthly_summary.published',
    year: 2026,
    month: 7,
    summaryAt: '2026-07-31T00:00:00Z',
    employee: { email: 'somchai@odds.team', englishName: 'Somchai' },
    sites: [
      { clientSite: 'SCB', customerName: 'SCB Bank', workingDays: 18, overtimeDays: 2 },
      { clientSite: 'KBank', customerName: 'Kasikorn', workingDays: 2.5, overtimeDays: 0 },
    ],
    receivedAt: '2026-08-01T09:00:00Z',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetInboxComponent],
      imports: [HttpClientTestingModule],
      providers: [WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetInboxComponent);
    component = fixture.componentInstance;
    worklogService = TestBed.inject(WorklogApiService);
  });

  it('should create', () => {
    spyOn(worklogService, 'getTimesheetEventLogs').and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load the latest event logs on init', () => {
    const spy = spyOn(worklogService, 'getTimesheetEventLogs').and.returnValue(of([mockLog]));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(100);
    expect(component.logs).toEqual([mockLog]);
    expect(component.loading).toBeFalsy();
    expect(component.loadError).toBeNull();
  });

  it('should show an error message when loading fails', () => {
    spyOn(worklogService, 'getTimesheetEventLogs').and.returnValue(throwError(() => new Error('boom')));

    fixture.detectChanges();

    expect(component.logs).toEqual([]);
    expect(component.loading).toBeFalsy();
    expect(component.loadError).toBeTruthy();
  });

  it('should total working and overtime days across sites', () => {
    expect(component.totalWorkingDays(mockLog)).toBe(20.5);
    expect(component.totalOvertimeDays(mockLog)).toBe(2);
  });

  it('should total to zero when the event has no sites', () => {
    const noSites = { ...mockLog, sites: [] };
    expect(component.totalWorkingDays(noSites)).toBe(0);
    expect(component.totalOvertimeDays(noSites)).toBe(0);
  });
});
