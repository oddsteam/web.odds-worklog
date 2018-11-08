import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorklogApiService } from '../core/worklog-api.service';
import { IncomeFlag } from '../shared/model/income-flag';
import { StateService } from '../core/state.service';

@Component({
    selector: 'app-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

    constructor(
        private worklogApiService: WorklogApiService,
        private router: Router,
        private  stateService: StateService
    ) {
    }

    ngOnInit() {
        this.worklogApiService.getLogin().subscribe(res => {
            if (res) {
                sessionStorage.setItem('token', 'Bearer ' + res.token);
                this.getUserByID();
            }
        });
        this.router.navigate([
            `/corporate`
        ]);
    }

    getUserByID() {
        this.worklogApiService.getUserByID().subscribe(data => {
            if (data.corporateFlag === 'Y') {
                IncomeFlag.typeUser = 'corporate';
            } else {
                IncomeFlag.typeUser = 'individual';
            }
            this.setFlagUsers(data.corporateFlag);
        });
    }
    setFlagUsers(flag: string) {
        this.stateService.setFlagUser(flag);
    }
}
