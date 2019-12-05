import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FileService } from 'src/app/core/file.service';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    name: string;
    imageProfile: SafeUrl;
    id = sessionStorage.getItem('idUser');
    taviStatus = false;
    role: string;

    constructor(
        public translate: TranslateService,
        private worklogApiService: WorklogApiService,
        private stateService: StateService,
        private router: Router,
        private fileService: FileService,
        private sanitizer: DomSanitizer
    ) {
        translate.setDefaultLang('en');
        translate.use('th');
    }

    ngOnInit() {
        this.worklogApiService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished()
            .subscribe(() => {
                this.getUserID(),
                    this.getUserIncome();
            });

        this.stateService.headerTrigger.subscribe(data => {
            this.getUserID();
        });
    }

    getUserID() {
        this.worklogApiService.getUserByID(this.id).subscribe(res => {
            if (res.role === 'corporate') {
                this.name = res.corporateName;
            } else {
                this.name = res.firstName + ' ' + res.lastName;
            }
            this.role = res.role;
            this.taviStatus = res.statusTavi;
            this.stateService.setTypeUser(res.role);
            this.stateService.setFlagVat(res.vat);
            if (res.imageProfile) {
                this.getImgaeProfileURL();
            } else {
                this.imageProfile = null;
            }
        });
    }

    getUserIncome() {
        this.worklogApiService.getIncomeByUserID(this.id).subscribe(res => {
            if (res) {
                this.stateService.setFlagUser('N');
            } else {
                this.stateService.setFlagUser('Y');
            }
        });
    }

    getImgaeProfileURL() {
        this.fileService.downloadImageProFile().subscribe(res => {
            const urlCreator = window.URL;
            this.imageProfile = this.sanitizer.bypassSecurityTrustUrl(
                urlCreator.createObjectURL(res));
        });
    }

    exportTavi50() {
        this.worklogApiService.exportDataPdf(sessionStorage.getItem('idUser')).subscribe(
            res => {
                this.downloadFile(res, 'tavi50.zip');
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
