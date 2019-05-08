import { Site } from './site';

export class User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    corporateName?: string;
    email: string;
    bankAccountName: string;
    bankAccountNumber: string;
    thaiCitizenId: string;
    vat: string;
    slackAccount: string;
    transcript: string;
    siteId: string;
    site: Site;
    project: string;
    imageProfile: string;
    dailyIncome: string;
    address: string;
    statusTavi: boolean;
    idCard: string;
    degreeCertificate: string;
}
