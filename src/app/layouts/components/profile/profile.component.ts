import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name = 'Tom & Friend';
  constructor(
      public translate: TranslateService,
  ) {
      translate.setDefaultLang('en');
      translate.use('th');
  }

  ngOnInit() {
  }

}
