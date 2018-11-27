import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorklogApiService } from '../core/worklog-api.service';

@Component({
    selector: 'app-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
    personType: string;
    constructor(
        private worklogApiService: WorklogApiService,
        private router: Router,
    ) {
    }

    ngOnInit() {}
}
