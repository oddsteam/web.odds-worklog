import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidator', () => {
    describe('validateAllFormFields', () => {
        it('should mark touched control when call validateAllFormFields', () => {

            const formGroup = new FormGroup({
                'formControl': new FormControl(true),
                'formArray': new FormArray([
                    new FormControl(null),
                    new FormControl(null)
                ])
            });

            spyOn(CustomValidators, 'validateAllFormFields').and.callThrough();

            CustomValidators.validateAllFormFields(formGroup);

            expect(CustomValidators.validateAllFormFields).toHaveBeenCalledTimes(2);
        });
    });
});
