import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class CustomValidators {
    static validateAllFormFields(form: FormGroup | FormArray) {

        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                CustomValidators.validateAllFormFields(control);
            } else if (control instanceof FormArray) {
                CustomValidators.validateAllFormFields(control);
            }
        });
    }
}
