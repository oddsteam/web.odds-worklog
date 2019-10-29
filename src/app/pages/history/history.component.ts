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
  incomeResponse: AddIncomeResponse[] = [];
  isNoData = false;
  isNoIndividual = false;
  dailyIncome = '';
  constructor(
    private worklogApiService: WorklogApiService,
  ) { }

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this.worklogApiService.getUserByID(this.id).subscribe(res => {
      res.role === 'individual' ? this.isNoIndividual = true : this.isNoIndividual = false;
      this.dailyIncome = res.dailyIncome;
      this.getIncome();
    });
  }

  getIncome() {
    this.worklogApiService.getIncomeAllMonthByUserID(this.id).subscribe(res => {
      if (res) {
        this.incomeResponse = res;
        this.isNoData = true;
        const array: any = res;
        array.forEach(value => {
          value.netIncome = this.calIncome(value.specialIncome, value.workingHours, value.totalIncome);
          value.totalIncome = this.calNetIncome(value.totalIncome, value.vat, value.wht);
          value.netSpecialIncome = this.calNetSpecialIncome(value.specialIncome, value.workingHours);
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

  calIncome(dailyIncome: string, workDay: string, totalIncome: string): string {
    const result = (this.stringToNumber(totalIncome) - (Number(dailyIncome) * Number(workDay))).toString();

    return result;
  }


  calNetSpecialIncome(SpecialIncome: string, workingHours: string): string {
    const result = (Number(SpecialIncome) * Number(workingHours)).toString();
    return result;
  }


  stringToNumber(text: string): number {
    return Number(this.cutComma(text));
  }

  cutComma(text: string): string {
    return text.replace(/,/g, '');
  }
}
