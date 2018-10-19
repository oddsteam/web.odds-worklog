import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name = 'Tom & Friend';

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('th');
  }

  ngOnInit() {
  }

}
