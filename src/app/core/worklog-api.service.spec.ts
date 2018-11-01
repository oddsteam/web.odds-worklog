/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorklogApiService } from './worklog-api.service';

describe('Service: WorklogApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorklogApiService]
    });
  });

  it('should ...', inject([WorklogApiService], (service: WorklogApiService) => {
    expect(service).toBeTruthy();
  }));
});
