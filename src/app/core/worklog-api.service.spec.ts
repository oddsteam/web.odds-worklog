/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { WorklogApiService } from './worklog-api.service';

describe('Service: WorklogApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorklogApiService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([WorklogApiService], (service: WorklogApiService) => {
    expect(service).toBeTruthy();
  }));
});
