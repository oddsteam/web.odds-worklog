import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  listBreadcrumb = [
  { key: 'all', text: 'Customers'},
  { key: 'productOwner', text: 'Product Owner'},
  { key: 'invoice', text: 'Invoice'}
  ];
  path = 'all';
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
       this.path = params.id;
    });
  }
  goToPage(key) {
    this.router.navigate(['customers/' + key]);
  }
}
