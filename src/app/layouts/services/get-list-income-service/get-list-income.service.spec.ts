import { TestBed } from '@angular/core/testing';

import { GetListIncomeService } from './get-income.service';

describe('GetListIncomeService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: GetListIncomeService = TestBed.get(GetListIncomeService);
        expect(service).toBeTruthy();
    });
});
