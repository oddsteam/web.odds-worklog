import { TestBed } from '@angular/core/testing';

import { AddIncomeService } from './income.service';

describe('IncomeService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AddIncomeService = TestBed.get(AddIncomeService);
        expect(service).toBeTruthy();
    });
});
