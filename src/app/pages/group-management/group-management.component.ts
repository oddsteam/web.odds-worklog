import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorklogApiService } from '../../core/worklog-api.service';
import { Site } from '../../shared/model/site';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {
  sites: Site[] = [];
  constructor(private worklogAPIService: WorklogApiService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.getSitesData();
  }
  getSitesData() {
    this.worklogAPIService.getSitesData().subscribe((res) => {
      res.forEach(value => {
        this.worklogAPIService.getUserBySiteId(value.id).subscribe((data) => {
          const site = new Site();
          site.id = value.id;
          site.name = value.name;
          site.length = data.length;
          site.users = data;
          this.sites.push(site);
        });
      });
    });
  }

  gotoUserListSite(users: User[], siteName: string) {
    this.worklogAPIService.setListData(users, siteName);
    this.router.navigate(['groupsManagement/users']);
  }

}
