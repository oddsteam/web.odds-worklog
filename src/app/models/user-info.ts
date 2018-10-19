export interface UsersInfoInterface {
  fullName: string;
  email: string;
  bankAccountName: string;
  bankAccountNumber: number;
  thaiCitizenID: number;
  submitDate: Date;
  totalIncome: number;
  status: string;
}

export class UsersInfoModel implements UsersInfoInterface {
  fullName: string;
  email: string;
  bankAccountName: string;
  bankAccountNumber: number;
  thaiCitizenID: number;
  submitDate: Date;
  totalIncome: number;
  status: string;
}

export class UsersInfo implements UsersInfoInterface {
  fullName: string;
  email: string;
  bankAccountName: string;
  bankAccountNumber: number;
  thaiCitizenID: number;
  submitDate: Date;
  totalIncome: number;
  status: string;
  constructor(fullName: string,
    email: string,
    bankAccountName: string,
    bankAccountNumber: number,
    thaiCitizenID: number,
    submitDate: Date,
    totalIncome: number,
    status: string) {
    this.email = email;
    this.bankAccountName = bankAccountName;
    this.bankAccountNumber = bankAccountNumber;
    this.thaiCitizenID = thaiCitizenID;
    this.submitDate = submitDate;
    this.totalIncome = totalIncome;
    this.status = status;
    this.fullName = fullName;
  }
}
