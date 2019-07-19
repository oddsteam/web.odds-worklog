import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ValidateCitizenIdUtil {
    validateCitizenId = (formControl: FormControl) => {
        const val = formControl.value;
        if (val === undefined) {
            return null;
        }
        if (val.length !== 13) {
            return null;
        } else {
            let sum = 0;
            const idCard = val;
            for (let i = 0; i < 12; i++) {
                sum += (idCard.charAt(i) * (13 - i));
            }
            sum = (11 - sum % 11) % 10;
            const checkIdCard = sum === Number(idCard.charAt(12));
            return checkIdCard ? null : { checkSum: { message: 'บัตรประชาชนไม่ถูกต้อง' } };
        }
    }
}
