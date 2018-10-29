import { TestBed } from '@angular/core/testing';

import { GetIncomeService } from './get-income.service';

describe('GetIncomeService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: GetIncomeService = TestBed.get(GetIncomeService);
        expect(service).toBeTruthy();
    });
});
