import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-owner',
  templateUrl: './product-owner.component.html',
  styleUrls: ['./product-owner.component.scss']
})
export class ProductOwnerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToInvoicePage() {
    this.router.navigate(['company/po/invoice']);
  }
}
