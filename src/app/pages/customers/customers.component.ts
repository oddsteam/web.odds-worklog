import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  path = 'all';
  customerId: string;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.path = param.id;
  });
  }
}
