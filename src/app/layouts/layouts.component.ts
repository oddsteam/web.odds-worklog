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
    id = sessionStorage.getItem('idUser');
    constructor(
        private worklogApiService: WorklogApiService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.worklogApiService.getUserByID(this.id).subscribe(res => {
            this.personType = res.corporateFlag;
            this.goToPage();
        });
    }

    goToPage() {
        if (this.personType === 'N') {
            this.router.navigate([`/individual`]);
        } else {
            this.router.navigate([`/corporate`]);
        }
    }
}
