import { Component, OnInit } from '@angular/core';
import { UsersInfo } from '../../../models/user-info';

@Component({
  selector: 'app-list-income',
  templateUrl: './list-income.component.html',
  styleUrls: ['./list-income.component.scss'],
})
export class ListIncomeComponent implements OnInit {
  date = new Date();
  usersInfo: UsersInfo[];
  selectName = 'Kitsada Khamthamun';
  recentUser: UsersInfo;
  constructor() {}

  ngOnInit() {
    this.usersInfo = [
      {
        fullName: 'aaaaaaaa aaaaaaaaaaa',
        email: 'aaaaaaaaaaa@odds.team',
        bankAccountName: 'aaaaaaaa aaaaaaaaaaa',
        bankAccountNumber: 1234567890,
        totalIncome: 0,
        submitDate: new Date(),
        thaiCitizenID: 12345678900,
        status: 'Y',
      },
      {
        fullName: 'bbbbbbb bbbbbbbbbbbbbb',
        email: 'bbbbbbbbbbb@odds.team',
        bankAccountName: 'bbbbbbb bbbbbbbbbbbbbb',
        bankAccountNumber: 1234567890,
        totalIncome: 0,
        submitDate: new Date(),
        thaiCitizenID: 12345678900,
        status: 'Y',
      },
      {
        fullName: 'ccccc  ccccccccccc',
        email: 'cccccccccc@odds.team',
        bankAccountName: 'ccccc  ccccccccccc',
        bankAccountNumber: 1234567890,
        totalIncome: 0,
        submitDate: new Date(),
        thaiCitizenID: 12345678900,
        status: 'N',
      },
      {
        fullName: 'Kitsada Khamthamun',
        email: 'kitsada@odds.team',
        bankAccountName: 'กฤษดา คำทะมูล',
        bankAccountNumber: 1234567890,
        totalIncome: 0,
        submitDate: new Date(),
        thaiCitizenID: 12345678901,
        status: 'N',
      },
      {
        fullName: 'eee eeeeeee',
        email: 'eee@odds.team',
        bankAccountName: 'eee eeeeeee',
        bankAccountNumber: 1234567890,
        totalIncome: 0,
        submitDate: new Date(),
        thaiCitizenID: 12345678900,
        status: 'Y',
      },
    ];
  }
}
