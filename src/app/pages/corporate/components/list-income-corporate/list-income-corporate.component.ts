import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from '../../../../core/worklog-api.service';

@Component({
  selector: 'app-list-income-corporate',
  templateUrl: './list-income-corporate.component.html',
  styleUrls: ['./list-income-corporate.component.scss']
})
export class ListIncomeCorporateComponent implements OnInit {

  constructor(
    private worklogService: WorklogApiService
  ) { }

  ngOnInit() {
    this.worklogService.getListIncomeCorporate().subscribe(response => {
      console.log(response);
    });
  }

}
