import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from '../core/worklog-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

    constructor(
        private worklogService: WorklogApiService,
        private router: Router
    ) {
     }

    ngOnInit() {
        this.worklogService.getLogin().subscribe(res => {
            if (res != null && res.length > 0) {
                sessionStorage.setItem('token', 'Bearer ' + res.token);
            }
        });
        this.router.navigate([
            `/corporate`
          ]);
    }
}
