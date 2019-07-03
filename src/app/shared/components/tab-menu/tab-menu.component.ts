import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { IncomeFlag } from '../../model/income-flag';
import { StateService } from 'src/app/core/state.service';

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
    { id: 'history', text: 'HISTORY', icon: 'fa-history', level: 0 },
    { id: 'profile', text: 'PROFILE', icon: 'fa-user-circle', level: 0 },
    { id: 'settings', text: 'SETTINGS', icon: 'fa-cog', level: 0 },
  ];
  listTabMenuShow = [];
  id = sessionStorage.getItem('idUser');

  constructor(
    private router: Router,
    private worklogApiService: WorklogApiService,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.getUserById();
    this.checkUserType();
    this.tabActive = sessionStorage.getItem('tabActive') ? sessionStorage.getItem('tabActive') : this.personType;
  }

  routerTo(path) {
    if (path === 'servant') {
      this.isShowLess = !this.isShowLess;
    } else {
      this.tabActive = path;
      sessionStorage.setItem('tabActive', this.tabActive);
      IncomeFlag.typeGetListService = path;
      this.router.navigate([`/${path}`]);
    }
  }

  getUserById() {
    this.worklogApiService.getUserByID(this.id).subscribe(res => {
      this.personType = res.role;
      this.checkTabMenu(res.role);
    });
  }

  checkUserType() {
    this.stateService.getTypeUser().subscribe(userType => {
      this.personType = userType;
      this.checkTabMenu(userType);
    });
  }

  checkTabMenu(userType: string) {
    if (userType) {
      if (userType !== 'admin') {
        this.listTabMenuShow = this.listTabMenu.filter(x => x.id === userType || x.id === 'profile' || x.id === 'history');
      } else {
        this.listTabMenuShow = this.listTabMenu;
      }
    }
  }
}
