import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-proflie',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    name: string = "Tom & Friend";
    constructor(
        public translate: TranslateService
    ) {
        translate.setDefaultLang('en')
        translate.use('th')
    }

    ngOnInit() {
    }

}
