import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  id = sessionStorage.getItem('idUser');
  profileUser: User;
  constructor(
    private formBuilder: FormBuilder,
    private worklogApiService: WorklogApiService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getData();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      bankAccount: ['', Validators.required],
      bankAccountNumber: ['', Validators.required]
    });
  }

  getData() {
    this.worklogApiService.getUserByID(this.id).subscribe(data => {
      this.firstNameForm.setValue(data.firstName);
      this.lastNameForm.setValue(data.lastName);
      this.emailForm.setValue(data.email);
      this.bankAccountForm.setValue(data.bankAccountName);
      this.bankAccountNumberForm.setValue(data.bankAccountNumber);
    });
  }

  get firstNameForm(): FormControl {
    return this.profileForm.get('firstName') as FormControl;
  }

  get lastNameForm(): FormControl {
    return this.profileForm.get('lastName') as FormControl;
  }

  get emailForm(): FormControl {
    return this.profileForm.get('email') as FormControl;
  }

  get bankAccountForm(): FormControl {
    return this.profileForm.get('bankAccount') as FormControl;
  }

  get bankAccountNumberForm(): FormControl {
    return this.profileForm.get('bankAccountNumber') as FormControl;
  }
}
