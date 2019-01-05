import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from '../../../../core/worklog-api.service';
import { User } from '../../../../shared/model/user';

@Component({
  selector: 'app-table-list-user-by-site',
  templateUrl: './table-list-user-by-site.component.html',
  styleUrls: ['./table-list-user-by-site.component.scss']
})
export class TableListUserBySiteComponent implements OnInit {
  constructor(private workLogAPIService: WorklogApiService) { }
  listData: User[] = [];
  siteName: string;
  ngOnInit() {
    this.getListUserDataSites();
  }
  getListUserDataSites() {
    this.listData = this.workLogAPIService.getListData();
    this.siteName = this.workLogAPIService.getSiteName();
  }



}
