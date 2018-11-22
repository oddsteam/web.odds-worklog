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
        private worklogApiService: WorklogApiService
    ) {
        translate.setDefaultLang('en');
        translate.use('th');
    }

    ngOnInit() {
        this.worklogApiService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished().subscribe(() => this.getUserID());

    }

    getUserID() {
        this.worklogApiService.getUserByID().subscribe(res => {
            this.name = res.fullnameEn;
        });
    }

    exportTawi50() {
        this.worklogApiService.exportDataPdf().subscribe(
            res => {
              this.downloadFile(res, 'testPdf.pdf');
            },
            err => {
              console.log(err);
              alert(`Can't export to PDF file.`);
            }
          );
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
