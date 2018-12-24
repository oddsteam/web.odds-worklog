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
  isShowLess = true;
  listTabMenu = [
    { id: 'corporate', text: 'CORPORATE', icon: 'fa-building', level: 0 },
    { id: 'individual', text: 'INDIVIDUAL', icon: 'fa-user', level: 0 },
    { id: 'servant', text: 'SERVANT', icon: 'fa-users', level: 0 },
    { id: 'users', text: 'USERS', icon: '', level: 1 },
    { id: 'groups/all', text: 'GROUPS', icon: '', level: 1 },
    { id: 'customers/all', text: 'CUSTOMERS', icon: '', level: 1 },
    { id: 'profile', text: 'PROFILE', icon: 'fa-user-circle', level: 0 },
    { id: 'settings', text: 'SETTINGS', icon: 'fa-cog', level: 0 },
  ];
  listTabMenuShow = [];
  private id = sessionStorage.getItem('idUser');

  constructor(
    private router: Router,
    private worklogApiService: WorklogApiService
  ) { }

  ngOnInit() {
    this.worklogApiService.getUserByID(this.id).subscribe(res => {
      this.personType = res.role;
      if (this.personType !== 'admin') {
        this.listTabMenuShow = this.listTabMenu.filter(x => x.id === this.personType || x.id === 'profile');
      } else {
        this.listTabMenuShow = this.listTabMenu;
      }
    });
  }

  routerTo(path) {
    if (path === 'servant') {
      this.isShowLess = !this.isShowLess;
    } else {
      this.personType = path;
      IncomeFlag.typeGetListService = path;
      this.router.navigate([`/${path}`]);
    }
  }
}
