import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-income',
  templateUrl: './list-income.component.html',
  styleUrls: ['./list-income.component.scss'],
})
export class ListIncomeComponent implements OnInit {
  date: Date;
  constructor() {}

  ngOnInit() {
    this.date = new Date();
  }
}
