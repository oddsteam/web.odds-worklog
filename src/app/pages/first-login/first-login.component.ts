import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorklogApiService } from '../../core/worklog-api.service';
import { User } from '../../shared/model/user';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
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
      vat: [true, Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid === true
      && this.loginForm.controls.role.value === true
      && this.loginForm.controls.vat.value === true
    ) {
      this.user = new User();
      this.user.firstName = this.loginForm.get('firstName').value;
      this.user.lastName = this.loginForm.get('lastName').value;
      this.user.bankAccountName = this.loginForm.get('bankAccountName').value;
      this.user.bankAccountNumber = this.loginForm.get('bankAccountNumber').value;
      this.user.slackAccount = this.loginForm.get('slackAccount').value;
      this.user.role = this.role;
      this.user.vat = this.vat;
      this.updateUser();
    }
  }

  private updateUser() {
    this.worklogService.updateUser(sessionStorage.getItem('idUser'), this.user)
      .subscribe(res => {
        if (res.role === 'admin') {
          this.router.navigate(['corporate']);
        } else {
          this.router.navigate([res.role]);
        }
      },
        err => {
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
    this.vat = (this.isCheckRole === true) ? 'individual' : 'corporate';
    this.roles.map(data => {
      if (data.name !== role) {
        data.value = false;
      } else {
        data.value = true;
      }
    });
  }
}
