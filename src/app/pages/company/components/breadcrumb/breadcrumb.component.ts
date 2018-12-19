import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  currentPage = 'Company';
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentPage = this.formatUrlToPage(this.router.url);
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const url = val.url;
        this.currentPage = this.formatUrlToPage(url.substr(1));
      }
    });
  }

  formatUrlToPage(input: string): string {
    if (input[0] === '/') {
      input = input.substr(1);
    }

    if (input.includes('/')) {
      input = input.substr(0, input.indexOf('/'));
    }

    if (input === '') {
      input = 'marketSummary';
    }

    return input.split(';')[0];
  }
}
