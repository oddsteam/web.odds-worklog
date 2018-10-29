export class ListIncomeResponse {
    user: Users;
    submitDate: string;
    status: string;
}

export class Users {
    id: string;
    fullnameTh: string;
    fullnameEn: string;
    email: string;
    bankAccountName: string;
    bankAccountNumber: string;
    corporateFlag: string;
}
