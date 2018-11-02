import { Component, OnInit } from '@angular/core';
import { WorklogApiService } from '../core/worklog-api.service';
import { Router } from '@angular/router';
import { IncomeFlag } from '../shared/model/income-flag';

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
            if (res) {
                sessionStorage.setItem('token', 'Bearer ' + res.token);
                this.getUserByID();
            }
        });
        this.router.navigate([
            `/corporate`
          ]);
    }

    private getUserByID() {
        this.worklogService.getUserByID().subscribe(data => {
            if (data.corporateFlag === 'Y') {
                IncomeFlag.typeUser = 'corporate';
            } else {
                IncomeFlag.typeUser = 'individual';
            }
        });
    }
}
