import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';

@Component({
  selector: 'app-list-income-individual',
  templateUrl: './list-income-individual.component.html',
  styleUrls: ['./list-income-individual.component.scss']
})
export class ListIncomeIndividualComponent implements OnInit {
  listIncome: ListIncomeResponse;
  constructor(
    private worklogService: WorklogApiService,
  ) { }

  ngOnInit() {
    this.worklogService.getListIncomeIndividual().subscribe(response => {
      this.listIncome = response;
    });
  }

}
