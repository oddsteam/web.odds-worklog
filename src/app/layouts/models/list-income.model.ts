export class ListIncomeResponse {
    user: Users;
    submitDate: string;
    status: string;
}

export class Users {
    id: string;
    fullname: string;
    email: string;
    bankAccountName: string;
    bankAccountNumber: string;
    thaiCitizenId: string;
    corporateFlag: string;
}
