import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  id = sessionStorage.getItem('idUser');
  incomeResponse: AddIncomeResponse;
  isNoData = false;
  isNoIndividual = false;

  constructor(
    private worklogApiService: WorklogApiService,
  ) { }

  ngOnInit() {
    this.getUserById();
    this.getIncome();
  }

  getUserById() {
    this.worklogApiService.getUserByID(this.id).subscribe(res => {
      res.role === 'individual' ? this.isNoIndividual = true : this.isNoIndividual = false;
    });
  }

  getIncome() {
    this.worklogApiService.getIncomeAllMonthByUserID(this.id).subscribe(res => {
      if (res !== null) {
        this.incomeResponse = res;
        this.isNoData = true;

        const array: any = res;
        array.forEach(value => {
          value.totalIncome = this.calNetIncome(value.totalIncome, value.vat, value.wht);
        });
      } else { this.isNoData = false; }
    });
  }

  checkValue(data: string): string {
    return data.trim() === '' ? '-' : data.trim();
  }

  calNetIncome(totalIncome: string, vat: string, wht: string): string {
    return (
      this.stringToNumber(totalIncome) +
      this.stringToNumber(vat) -
      this.stringToNumber(wht)
    ).toString();
  }

  stringToNumber(text: string): number {
    return Number(this.cutComma(text));
  }

  cutComma(text: string): string {
    return text.replace(/,/g, '');
  }
}
