import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from '../../../../core/worklog-api.service';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';

@Component({
  selector: 'app-list-income-corporate',
  templateUrl: './list-income-corporate.component.html',
  styleUrls: ['./list-income-corporate.component.scss']
})
export class ListIncomeCorporateComponent implements OnInit {

  listIncome: ListIncomeResponse;
  constructor(
    private worklogService: WorklogApiService
  ) { }

  ngOnInit() {
    this.worklogService.getListIncomeCorporate().subscribe(response => {
      this.listIncome = response;
    });
  }

}
