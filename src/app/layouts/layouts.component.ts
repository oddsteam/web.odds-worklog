import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorklogApiService } from '../core/worklog-api.service';

@Component({
    selector: 'app-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

    constructor(
        private worklogApiService: WorklogApiService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.worklogApiService.getLogin().subscribe(res => {
            if (res) {
                sessionStorage.setItem('token', 'Bearer ' + res.token);
                this.goToPage();
            }
        });
    }
    goToPage() {
        this.router.navigate([
            `/corporate`
        ]);
    }
}
