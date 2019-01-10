import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorklogApiService } from '../../core/worklog-api.service';
import { Site } from '../../shared/model/site';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  siteList: Site[];
  vatList = [
    {
      value: 'Y',
      name: 'vat',
      isCheck: false
    },
    {
      value: 'N',
      name: 'non-vat',
      isCheck: true
    },
  ];
  roles = [
    {
      value: 'individual',
      name: 'Individual',
      isCheck: true
    },
    {
      value: 'corporate',
      name: 'Corporate',
      isCheck: false
    }
  ];
  role = 'individual';
  vat = 'N';
  isCorporate = false;

  constructor(private fb: FormBuilder,
    private worklogService: WorklogApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getListSite();
    this.setupForm();
  }

  setupForm() {
    this.loginForm = this.fb.group({
      firstName: ['', Validators.pattern('[a-zA-Z]{2,20}')],
      lastName: ['', Validators.pattern('[a-zA-Z]{2,20}')],
      corporateName: [''],
      bankAccountName: ['', Validators.required],
      bankAccountNumber: ['', Validators.pattern('\\d{9,16}')],
      slackAccount: ['', Validators.email],
      role: [true, Validators.required],
      vat: [true, Validators.required],
      siteId: ['select site', Validators.required],
      project: ['']
    });
  }

  submit() {
    // tslint:disable-next-line:max-line-length
    const { firstName, lastName, corporateName, bankAccountName, bankAccountNumber, slackAccount, role, vat, siteId, project } = this.loginForm.getRawValue();

    // tslint:disable-next-line:max-line-length
    if (firstName
      && lastName
      && bankAccountName
      && bankAccountNumber
      && slackAccount
      && role
      && vat
      && (siteId !== 'select site')
    ) {
      this.user = new User();
      if (this.role === 'corporate') {
        if (corporateName === '') {
          alert('Please complete the information.');
          return;
        }
        this.user.corporateName = corporateName;
      }
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.bankAccountName = bankAccountName;
      this.user.bankAccountNumber = bankAccountNumber;
      this.user.slackAccount = slackAccount;
      this.user.role = this.role;
      this.user.vat = this.vat;
      this.user.siteId = siteId;
      this.user.project = project;
      this.updateUser();
    } else {
      alert('Please complete the information.');
    }
  }

  updateUser() {
    this.worklogService.updateUser(sessionStorage.getItem('idUser'), this.user)
      .subscribe(res => {
        if (res.role === 'admin') {
          this.router.navigate(['corporate']);
        } else {
          this.router.navigate([res.role]);
        }
      },
        error => {
          this.router.navigate(['login']);
        });
  }

  onCheckBoxVat(vat: string) {
    this.vat = vat;
    this.vatList.map(val => {
      val.isCheck = (vat === val.value);
    });
  }

  onCheckBoxRole(role: string) {
    this.role = role;
    this.roles.map(val => {
      val.isCheck = (role === val.value);
    });
    this.isCorporate = (role === 'corporate');
    this.onCheckBoxVat(!this.isCorporate ? 'N' : 'Y');
  }

  getListSite() {
    this.worklogService.getSitesData().subscribe((res) => {
      this.siteList = res;
    },
      error => {
        this.router.navigate(['login']);
      });
  }
}
