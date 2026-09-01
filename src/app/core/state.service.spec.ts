import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('StateService', () => {
  let mockService: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
    });
    mockService = TestBed.inject(StateService);
  });

  it('should be created', () => {
    const service: StateService = TestBed.inject(StateService);
    expect(service).toBeTruthy();
  });

  it('should default useTimesheetSource to true', (done) => {
    mockService.useTimesheetSource.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should broadcast the new value when setUseTimesheetSource is called', (done) => {
    mockService.setUseTimesheetSource(true);

    mockService.useTimesheetSource.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });
});
