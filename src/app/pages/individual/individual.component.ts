import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {
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
