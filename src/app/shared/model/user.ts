import { Site } from './site';

export class User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    bankAccountName: string;
    bankAccountNumber: string;
    thaiCitizenId: string;
    vat: string;
    slackAccount: string;
    transcript: string;
    siteId: string;
    site: Site;
    imageProfile: string;
}
