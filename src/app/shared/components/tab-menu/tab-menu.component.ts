import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { IncomeFlag } from '../../model/income-flag';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  personType: string;
  recentTab: string;
  constructor(
    private router: Router,
    private worklogApiService: WorklogApiService
  ) {
  }

  ngOnInit() {
    this.worklogApiService.getUserByID().subscribe(res => {
      this.personType = res.corporateFlag;

      if (this.personType === 'N') {
        this.recentTab = 'individual';
      } else {
        this.recentTab = 'corporate';
      }
    });
  }

  routerTo(path) {
    this.recentTab = path;
    IncomeFlag.typeGetListService = path;
    this.router.navigate([`/${path}`]);
  }

}
