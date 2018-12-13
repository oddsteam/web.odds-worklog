import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  transcriptForm: FormGroup;
  id = sessionStorage.getItem('idUser');
  transcriptFile: File = null;
  oldTranscriptFile = null;
  dataListSite = [
    { key: 'Default', value: 'No Site' },
    { key: 'KTB', value: 'KTB' },
    { key: 'SET', value: 'SET' },
    { key: 'DTAC', value: 'DTAC' },
    { key: 'SEC', value: 'SEC' },
    { key: 'AIS', value: 'AIS' },
    { key: 'KBTG', value: 'KBTG' },
  ];

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
      bankAccountNumber: ['', Validators.required],
      slackAccount: ['', Validators.required]
    });

    this.transcriptForm = this.formBuilder.group({
      transcriptFile: [null]
    });
  }

  onChangeFile(event) {
    const file = event.target.files[0];
    this.transcriptFile = event.target.files[0];
    if (file) {
      this.onSubmit(file);
    }
  }

  onSubmit(file) {
    this.worklogApiService.uploadFileTranscript(file).subscribe(response => {
      const message = response['message'];
      alert(message);
    });
  }

  getData() {
    this.worklogApiService.getUserByID(this.id).subscribe(data => {
      this.firstNameForm.setValue(data.firstName);
      this.lastNameForm.setValue(data.lastName);
      this.emailForm.setValue(data.email);
      this.bankAccountForm.setValue(data.bankAccountName);
      this.bankAccountNumberForm.setValue(data.bankAccountNumber);
      this.slackAccount.setValue(data.slackAccount);
    });
  }

  get getTranscriptFile(): Object {
    if (this.transcriptFile) {
      return {
        fileName: this.transcriptFile.name,
        fileItem: this.transcriptFile
      };
    }
    return { fileName: 'No file was chosen.', fileItem: null };
  }

  get hasOldTranscriptFileAtStart(): Boolean {
    return this.oldTranscriptFile !== null && this.transcriptFile === null
      ? true
      : false;
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
  get slackAccount(): FormControl {
    return this.profileForm.get('slackAccount') as FormControl;
  }
}
