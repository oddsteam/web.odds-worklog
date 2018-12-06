export class Users {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bankAccountName: string;
    bankAccountNumber: string;
    corporateFlag: string;
    thaiCitizenId: string;
    vat: string;
}

export class FirstLogin {
    email: string;
    firstLogin: string;

    constructor() {
        this.email = '';
        this.firstLogin = 'N';
    }
}
