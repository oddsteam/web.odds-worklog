import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    name: string;
    id = sessionStorage.getItem('idUser');
    constructor(
        public translate: TranslateService,
        private worklogApiService: WorklogApiService,
        private stateService: StateService,
        private router: Router
    ) {
        translate.setDefaultLang('en');
        translate.use('th');
    }

    ngOnInit() {
        this.worklogApiService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished()
            .subscribe(() => { this.getUserID(), this.getUserIncome(); });

    }

    getUserID() {
        this.worklogApiService.getUserByID(this.id).subscribe(res => {
            this.name = res.firstName + ' ' + res.lastName;
            this.stateService.setTypeUser(res.corporateFlag);
            this.stateService.setFlagVat(res.vat);
        });
    }

    getUserIncome() {
        this.worklogApiService.getIncomeMonth().subscribe(res => {
            if (res) {
                this.stateService.setFlagUser('N');
            } else {
                this.stateService.setFlagUser('Y');
            }
        });
    }

    exportTavi50() {
        this.worklogApiService.exportDataPdf().subscribe(
            res => {
                this.downloadFile(res, 'tavi50.pdf');
            },
            err => {
                console.log(err);
                alert(`Can't export to PDF file.`);
            }
        );
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['login']);
    }

    downloadFile(data: any, filename: string) {
        const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
