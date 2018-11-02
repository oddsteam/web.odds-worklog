import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  recentTab = 'corporate' ;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  routerTo(path) {
    this.recentTab = path;
    this.router.navigate([
      `/${path}`
    ]);
  }

}
