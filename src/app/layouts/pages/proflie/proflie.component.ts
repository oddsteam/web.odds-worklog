import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-proflie',
    templateUrl: './proflie.component.html',
    styleUrls: ['./proflie.component.scss']
})
export class ProflieComponent implements OnInit {

    constructor(
        public translate: TranslateService
    ) {
        translate.setDefaultLang('en')
        translate.use('th')
    }

    ngOnInit() {
    }

}
