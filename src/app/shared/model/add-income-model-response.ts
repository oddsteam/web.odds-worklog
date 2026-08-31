export class AddIncomeResponse {
    id: string;
    userId: string;
    totalIncome: string;
    netIncome: string;
    netDailyIncome: string;
    submitDate: string;
    note: string;
    vat: string;
    wht: string;
    whtRate?: number;
    workDate: string;
    specialIncome: string;
    netSpecialIncome: string;
    workingHours: string;
}
