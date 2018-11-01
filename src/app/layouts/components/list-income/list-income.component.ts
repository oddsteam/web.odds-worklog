import { Component, OnInit } from '@angular/core';
import { ListIncomeResponse } from '../../models/list-income-model-response';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-list-income',
  templateUrl: './list-income.component.html',
  styleUrls: ['./list-income.component.scss'],
})
export class ListIncomeComponent implements OnInit {
  date = new Date();
  listIncome: ListIncomeResponse;
  constructor(private listIncomeService: IncomeService) {}

  ngOnInit() {
    this.listIncomeService.getListIncomeStatus().subscribe(res => {
      this.listIncome = res;
    });
  }
}
