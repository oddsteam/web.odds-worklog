/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { HttpOptionService } from './http-option.service';

describe('Service: HttpOption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpOptionService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([HttpOptionService], (service: HttpOptionService) => {
    expect(service).toBeTruthy();
  }));
});
