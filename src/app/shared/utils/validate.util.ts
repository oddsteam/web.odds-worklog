import { Injectable } from '@angular/core';

@Injectable()
export class ValidateUtil {
    constructor(
        ) { }
        public validateCitizenId(citiZen: string): boolean {
            if (citiZen.length !== 13) {
                return false;
            }
            for (let i = 0, sum = 0; i < 12; i++) {
                sum += parseFloat(citiZen.charAt(i)) * (13 - i);
                if ((11 - sum % 11) % 10 !== parseFloat(citiZen.charAt(12))) {
                    return false;
                }
                return true;
            }
        }
}
