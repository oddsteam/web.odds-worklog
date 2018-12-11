import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  user: User;
  constructor(private worklogApiService: WorklogApiService) { }

  ngOnInit() {
    this.getUsersData();
  }
  getUsersData() {
    this.worklogApiService.getUsersData().subscribe(res => {
      this.user = res;
    });
  }
}
