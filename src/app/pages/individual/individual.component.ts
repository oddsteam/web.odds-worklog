import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {
  id = sessionStorage.getItem('idUser');
  personType: string;
  isUpdateIncome: boolean;
  constructor(
    private worklogApiService: WorklogApiService
  ) { }

  ngOnInit() {
    this.worklogApiService.getUserByID(this.id).subscribe(data => {
      this.personType = data.role;
    });
  }

  isShowData(): boolean {
    return this.personType === 'individual' || this.personType === 'admin';
  }

  addIncomeEmit(event) {
    if (event) {
      this.isUpdateIncome = event;
    }
  }

}
