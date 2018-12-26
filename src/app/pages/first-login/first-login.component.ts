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
      value: true,
      name: 'vat'
    },
    {
      value: false,
      name: 'non-vat'
    },
  ];
  roles = [
    {
      value: true,
      name: 'บุคคลธรรมดา'
    },
    {
      value: false,
      name: 'นิติบุคคล'
    }
  ];
  role = 'individual';
  vat = 'N';
  isCheckRole = true;

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
      bankAccountName: ['', Validators.required],
      bankAccountNumber: ['', Validators.pattern('\\d{9,16}')],
      slackAccount: ['', Validators.email],
      role: [true, Validators.required],
      vat: [true, Validators.required],
      siteId: ['กรุณาเลือก site ที่อยู่', Validators.required]
    });
  }

  submit() {
    const { firstName, lastName, bankAccountName, bankAccountNumber, slackAccount, role, vat, siteId } = this.loginForm.getRawValue();

    // tslint:disable-next-line:max-line-length
    if (firstName && lastName && bankAccountName && bankAccountNumber && slackAccount && role && vat && (siteId !== 'กรุณาเลือก site ที่อยู่')) {
      this.user = new User();
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.bankAccountName = bankAccountName;
      this.user.bankAccountNumber = bankAccountNumber;
      this.user.slackAccount = slackAccount;
      this.user.role = this.role;
      this.user.vat = this.vat;
      this.user.siteId = siteId;
      this.updateUser();
    } else {
      alert('กรุณากรอกข้อมูลให้ครบ');
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

  onCheckBoxVat(vatName) {
    this.vat = (vatName === 'non-vat') ? 'N' : 'Y';

    this.vatList.map(data => {
      if (data.name !== vatName) {
        data.value = false;
      } else {
        data.value = true;

      }
    });
  }

  onCheckBoxRole(role) {
    this.role = (role === 'บุคคลธรรมดา') ? 'individual' : 'corporate';
    this.isCheckRole = (role === 'บุคคลธรรมดา') ? true : false;
    this.vat = (this.isCheckRole === true) ? 'N' : 'Y';
    this.roles.map(data => {
      if (data.name !== role) {
        data.value = false;
      } else {
        data.value = true;
      }
    });
  }

  getListSite() {
    this.worklogService.getSitesData().subscribe((res) => {
      this.siteList = res;
    });
  }
}
