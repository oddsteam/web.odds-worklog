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
            console.log(res);
            if (!res) {
                sessionStorage.clear();
                this.router.navigate([`/login`]);
                return;
            }

            if (res.firstName === '' || res.lastName === '') {
                this.router.navigate([`/firstlogin`]);
                return;
            }
            this.personType = res.role;
            this.goToPage();
        });
    }

    goToPage() {
        if (this.personType === 'admin') {
            this.router.navigate([`/corporate`]);
        } else {
            this.router.navigate([`/${this.personType}`]);
        }
    }
}
