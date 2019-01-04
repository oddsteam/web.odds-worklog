import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorklogApiService } from '../../core/worklog-api.service';
import { ListSite, Site } from '../../shared/model/site';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {
  sites: ListSite[] = [];
  path = 'all';
  constructor(private worklogAPIService: WorklogApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.path = param.id;
    });
    this.getSitesData();
  }

  getSitesData() {
    this.worklogAPIService.getSitesData().subscribe((res) => {
      res.forEach(value => {
        this.worklogAPIService.getUserBySiteId(value.id).subscribe((data) => {
          const site = new ListSite();
          site.id = value.id;
          site.name = value.name;
          site.color = value.color;
          site.length = data.length;
          site.users = data;
          this.sites.push(site);
        });
      });
    });
  }

  gotoUserListSite(users: User[], siteName: string) {
    this.worklogAPIService.setListData(users, siteName);
    this.router.navigate(['groups/users']);
  }

  checkPath() {
    return this.path === 'all';
  }

}
