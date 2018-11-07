import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    name = 'ODDS';
    constructor(
        public translate: TranslateService,
        private workLogService: WorklogApiService
    ) {
        translate.setDefaultLang('en');
        translate.use('th');
    }

    ngOnInit() {
        this.workLogService.forCheckTokenPleaseRemoveMeIfLoginSuccess().subscribe(() => this.getUserID());

    }
    
    getUserID() {
        this.workLogService.getUserByID().subscribe(res => {
            this.name = res.fullnameEn;
        });
    }

}
