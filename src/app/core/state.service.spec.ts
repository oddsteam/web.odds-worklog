import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('StateService', () => {
  let mockService: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
    });
    mockService = TestBed.get(StateService);
  });

  it('should be created', () => {
    const service: StateService = TestBed.get(StateService);
    expect(service).toBeTruthy();
  });
});
