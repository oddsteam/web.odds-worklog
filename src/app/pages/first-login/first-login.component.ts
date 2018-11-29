import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorklogApiService } from '../../core/worklog-api.service';
import { Users } from '../../shared/model/user-model';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {
  firstLogin: FormGroup;
  user: Users;
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
  corporateFlag = [
    {
      value: true,
      name: 'บุคคลธรรมดา'
    },
    {
      value: false,
      name: 'นิติบุคคล'
    }
  ];
  corporate = 'N';
  vat = 'Y';
  constructor(private fb: FormBuilder,
    private worklogService: WorklogApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.firstLogin = this.fb.group({
      fullName: ['', Validators.required],
      bankAccountName: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      corporateFlag: [true, Validators.required],
      vat : [true, Validators.required]
    });
  }

  submit() {
    if (this.firstLogin.valid === true && this.firstLogin.controls.corporateFlag.value === true
    && this.firstLogin.controls.vat.value === true) {
      this.user = new Users();
      this.user.fullnameEn = this.firstLogin.get('fullName').value;
      this.user.email = sessionStorage.getItem('email');
      this.user.bankAccountName = this.firstLogin.get('bankAccountName').value;
      this.user.bankAccountNumber = this.firstLogin.get('bankAccountNumber').value;
      this.user.corporateFlag = this.corporate;
      this.user.thaiCitizenId = '12324567890';
      this.user.vat = this.vat;
      this.worklogService.updateUser(sessionStorage.getItem('idUser'), this.user).subscribe(res => {
        sessionStorage.setItem('firstLogin', 'N');
        this.router.navigate(['corporate']);
      },
        err => {
          this.router.navigate(['login']);
        });
    }
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
  onCheckBoxCorporateFlag(corporate) {
    this.corporate = (corporate === 'บุคคลธรรมดา') ? 'N' : 'Y';
    this.corporateFlag.map(data => {
      if (data.name !== corporate) {
        data.value = false;
      } else {
        data.value = true;
      }
    });
  }
}
