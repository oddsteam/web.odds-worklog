/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpOptionService } from './http-option.service';

describe('Service: HttpOption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpOptionService]
    });
  });

  it('should ...', inject([HttpOptionService], (service: HttpOptionService) => {
    expect(service).toBeTruthy();
  }));
});
