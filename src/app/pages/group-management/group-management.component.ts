import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorklogApiService } from '../../core/worklog-api.service';
import { ListSite } from '../../shared/model/site';
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
    this.sites = [];
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

  addSite() {
    const name = prompt('Enter site name');
    if (!name || !name.trim()) {
      return;
    }
    this.worklogAPIService.createSite({ name: name.trim() }).subscribe(
      () => this.getSitesData(),
      err => alert(err.error && err.error.message ? err.error.message : 'Failed to create site')
    );
  }

  editSite(event: Event, site: ListSite) {
    event.stopPropagation();
    const name = prompt('Edit site name', site.name);
    if (!name || !name.trim() || name.trim() === site.name) {
      return;
    }
    this.worklogAPIService.updateSite(site.id, { name: name.trim(), color: site.color }).subscribe(
      () => this.getSitesData(),
      err => alert(err.error && err.error.message ? err.error.message : 'Failed to update site')
    );
  }

  deleteSite(event: Event, site: ListSite) {
    event.stopPropagation();
    if (!confirm(`Delete site "${site.name}"?`)) {
      return;
    }
    this.worklogAPIService.deleteSite(site.id).subscribe(
      () => this.getSitesData(),
      err => {
        if (err.status === 409) {
          alert('Cannot delete site because it still has users');
          return;
        }
        alert(err.error && err.error.message ? err.error.message : 'Failed to delete site');
      }
    );
  }

  gotoUserListSite(users: User[], siteName: string) {
    this.worklogAPIService.setListData(users, siteName);
    this.router.navigate(['groups/users']);
  }

  checkPath() {
    return this.path === 'all';
  }

}
