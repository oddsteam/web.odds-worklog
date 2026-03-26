import { Site } from "./site";

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
  phone: string;
  startDate: string;

  constructor(user: {
    id?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    corporateName?: string;
    email?: string;
    bankAccountName?: string;
    bankAccountNumber?: string;
    thaiCitizenId?: string;
    vat?: string;
    transcript?: string;
    siteId?: string;
    site?: Site;
    project?: string;
    imageProfile?: string;
    dailyIncome?: string;
    address?: string;
    statusTavi?: boolean;
    idCard?: string;
    degreeCertificate?: string;
    phone?: string;
    startDate?: string
  } = {}) {
    this.id = user.id ? user.id : "";
    this.role = user.role ? user.role : "";
    this.firstName = user.firstName ? user.firstName : "";
    this.lastName = user.lastName ? user.lastName : "";
    this.email = user.email ? user.email : "";
    this.bankAccountName = user.bankAccountName ? user.bankAccountName : "";
    this.bankAccountNumber = user.bankAccountNumber
      ? user.bankAccountNumber
      : "";
    this.thaiCitizenId = user.thaiCitizenId ? user.thaiCitizenId : "";
    this.vat = user.vat ? user.vat : "";
    this.transcript = user.transcript ? user.transcript : "";
    this.siteId = user.siteId ? user.siteId : "";
    this.site = user.site ? user.site : {} as Site;
    this.project = user.project ? user.project : "";
    this.imageProfile = user.imageProfile ? user.imageProfile : "";
    this.dailyIncome = user.dailyIncome ? user.dailyIncome : "";
    this.address = user.address ? user.address : "";
    this.statusTavi = user.statusTavi ? user.statusTavi : false;
    this.idCard = user.idCard ? user.idCard : "";
    this.degreeCertificate = user.degreeCertificate
      ? user.degreeCertificate
      : "";
    this.phone = user.phone ? user.phone : "";
    this.startDate = user.startDate ? user.startDate : "";
  }
}
