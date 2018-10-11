export class UsersInfo {
  fullName: string;
  email: string;
  bankAccountName: string;
  bankAccountNumber: number;
  thaiCitizenID: number;
  submitDate: Date;
  totalIncome: number;
  status: string;
}

export class DefaultUsersLogin {
  fullName = 'Kitsada Khamthamun';
  email = 'kitsada@odds.team';
  bankAccountName = 'กฤษดา คำทะมูล';
  bankAccountNumber = '1234567890';
  thaiCitizenID = '12345678901';
  submitDate =  new Date();
  totalIncome = 0;
  status = 'N';
}
