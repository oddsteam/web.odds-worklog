import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { User } from 'src/app/shared/model/user';
import { Site } from 'src/app/shared/model/site';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  users: User[];
  sites: Site[] = [];
  constructor(private worklogApiService: WorklogApiService) { }

  ngOnInit() {
    this.getUsersData();
    this.loadSites();
  }

  getUsersData() {
    this.worklogApiService.getUsersData().subscribe(res => {
      this.users = res;
    });
  }

  deleteUser(user: User) {
    const label = `${user.firstName} ${user.lastName}`.trim() || user.email;
    if (!confirm(`Delete user "${label}"?`)) {
      return;
    }
    this.worklogApiService.deleteUser(user.id).subscribe(res => {
      this.users = this.users.filter(u => u.id != user.id);
    });
  }

  onSiteChanged(event: { userId: string; siteId: string }) {
    const user = this.users.find(u => u.id === event.userId);
    if (!user) {
      return;
    }
    const site = this.sites.find(s => s.id === event.siteId);
    user.site = site || { id: event.siteId, name: '-' };
    user.siteId = event.siteId;
  }

  private loadSites() {
    this.worklogApiService.getSitesData().subscribe(res => {
      this.sites = res;
    });
  }
}
