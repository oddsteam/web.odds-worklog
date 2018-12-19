import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToProductOwnerPage() {
    this.router.navigate(['company/po']);
  }

}
