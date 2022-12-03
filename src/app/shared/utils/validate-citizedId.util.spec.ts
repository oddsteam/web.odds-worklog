import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ValidateCitizenIdUtil } from './validate-citizenId.util';


describe('CheckSum', () => {
    let validator: ValidateCitizenIdUtil;

    beforeAll(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
});
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                ValidateCitizenIdUtil
            ]
        });
    });

    beforeEach(inject([ValidateCitizenIdUtil], (e: ValidateCitizenIdUtil) => {
        validator = e;
    }));

    it('should be created', () => {
        expect(validator).toBeTruthy();
    });

    it('return error message when value is checkIdCard true', () => {
        const fc = new FormControl('xxxxxxxxxxxxx');
        const result = validator.validateCitizenId(fc);
        expect(result).toBeTruthy();
        expect(result.checkSum.message).toEqual('บัตรประชาชนไม่ถูกต้อง');
    });

    it('return error message when value is checkIdCard true', () => {
        const fc = new FormControl('1234567890121');
        const result = validator.validateCitizenId(fc);
        expect(result).toEqual(null);
    });
});
