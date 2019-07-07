export class ValidateUtil {
    static validateCitizenId(citiZen: string): boolean {
        if (citiZen === undefined || citiZen === null) {
            return false;
        }
        if (citiZen.length !== 13) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseFloat(citiZen.charAt(i)) * (13 - i);
        }
        if (sum !== 0) {
            const sumCitizen = (11 - (sum % 11));
            switch (sumCitizen.toString().length) {
                case 1:
                    if (sumCitizen === parseFloat(citiZen.charAt(12))) {
                        return true;
                    } else {
                        return false;
                    }
                case 2:
                    if (parseFloat((sumCitizen.toString()).charAt(1)) === parseFloat(citiZen.charAt(12))) {
                        return true;
                    } else {
                        return false;
                    }
                default: return false;
            }
        }
    }
}
