import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from '../core/worklog-api.service';

@Component({
    selector: 'app-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

    constructor(
        private worklogService: WorklogApiService
    ) { }

    ngOnInit() {
        this.worklogService.getLogin().subscribe(res => {
            if (res != null && res.length > 0) {
                sessionStorage.setItem('token', 'Bearer ' + res.token);
            }
        });
    }
}
