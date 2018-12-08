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

  tabActive: string;
  personType: string;

  private id = sessionStorage.getItem('idUser');

  constructor(
    private router: Router,
    private worklogApiService: WorklogApiService
  ) { }

  ngOnInit() {
    this.worklogApiService.getUserByID(this.id).subscribe(res => {
      this.personType = res.role;

      if (this.personType === 'admin') {
        this.tabActive = 'corporate';
      } else {
        this.tabActive = this.personType;
      }
    });
  }

  routerTo(path) {
    this.tabActive = path;
    IncomeFlag.typeGetListService = path;
    this.router.navigate([`/${path}`]);
  }

  isEnableShowTabCorporate(): boolean {
    return this.personType === 'corporate' || this.personType === 'admin';
  }

  isEnableShowTabIndividual(): boolean {
    return this.personType === 'individual' || this.personType === 'admin';
  }

  isEnableShowTabSetting(): boolean {
    return this.personType === 'admin';
  }

  isActiveTabCorporate(): boolean {
    return this.tabActive === 'corporate';
  }

  isActiveTabIndividual(): boolean {
    return this.tabActive === 'individual';
  }

  isActiveTabSettings(): boolean {
    return this.tabActive === 'settings';
  }

}
