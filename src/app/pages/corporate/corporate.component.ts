import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {
  personType: string;
  constructor(
    private worklogApiService: WorklogApiService
  ) { }

  ngOnInit() {
    this.worklogApiService.getUserByID().subscribe(data => {
      this.personType = data.corporateFlag;
    });
  }

}
