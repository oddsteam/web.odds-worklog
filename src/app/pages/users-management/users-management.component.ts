import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { User } from 'src/app/shared/model/user';
import { Site } from 'src/app/shared/model/site';
import { DefaultRouteReuseStrategy } from '@angular/router/src/route_reuse_strategy';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  user: User;
  sites: Site[] = [];
  constructor(private worklogApiService: WorklogApiService) { }

  ngOnInit() {
    this.getUsersData();
    this.loadSites();
  }

  getUsersData() {
    this.worklogApiService.getUsersData().subscribe(res => {
      this.user = res;
    });
  }

  deleteUser(userId: string) {
    console.log(userId);
    this.worklogApiService.deleteUser(userId).subscribe( res => {
      console.log("delete success")
    });
  }

  private loadSites() {
    this.worklogApiService.getSitesData().subscribe(res => {
      this.sites = res;
    });
  }
}
