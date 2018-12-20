import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { User } from 'src/app/shared/model/user';
import { MyFile } from './file';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  fileForm: FormGroup;
  id = sessionStorage.getItem('idUser');
  transcriptFile: File = null;
  imageFile: File = null;
  oldTranscriptFile = null;
  urlDownloadTranscriptFile = null;
  dataListSite = [
    { key: 'Default', value: 'No Site' },
    { key: 'KTB', value: 'KTB' },
    { key: 'SET', value: 'SET' },
    { key: 'DTAC', value: 'DTAC' },
    { key: 'SEC', value: 'SEC' },
    { key: 'AIS', value: 'AIS' },
    { key: 'KBTG', value: 'KBTG' },
  ];
  userInfo: User;
  personType: string;
  showSuccessMessage = false;
  successMessage: string;
  fileNamePdf: string;
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
  isVat = 'N';
  site = '';

  constructor(
    private formBuilder: FormBuilder,
    private worklogApiService: WorklogApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.getData();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      bankAccount: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      slackAccount: ['', Validators.required],
    });

    this.fileForm = this.formBuilder.group({
      transcriptFile: [null],
      imageFile: [null]
    });
  }

  onChangeImageFile(event) {
    this.imageFile = event.target.files[0];
    this.worklogApiService.uploadImageProfile(this.imageFile).subscribe(res => {
      alert(res['message']);
    });
  }

  getData() {
    this.worklogApiService.getUserByID(this.id).subscribe(data => {
      this.userInfo = data;
      // this.urlDownloadTranscriptFile = `${environment.api}files/transcript` + data.id;
      this.personType = data.role;
      this.firstNameForm.setValue(data.firstName);
      this.lastNameForm.setValue(data.lastName);
      this.emailForm.setValue(data.email);
      this.bankAccountForm.setValue(data.bankAccountName);
      this.bankAccountNumberForm.setValue(data.bankAccountNumber);
      this.slackAccount.setValue(data.slackAccount);
      this.isVat = data.vat;
      if (data.vat === 'N') {
        this.vatList[0].value = false;
        this.vatList[1].value = true;
      }
      this.getNameSite();
    });
  }

  getNameSite() {
    this.worklogApiService.getSitesData().subscribe(res => {
      const result = res.filter(val => val.id === this.userInfo.siteId);
      if (result.length !== 0) {
        this.site = result[0].name;
      }
    });
  }

  updateData() {
    this.setDataToModel();
    this.worklogApiService.updateUser(this.id, this.userInfo).subscribe();
    this.showSuccessMessage = true;
    this.successMessage = 'Saved';
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
    window.scrollTo(0, 0);
  }

  setDataToModel() {
    this.userInfo.firstName = this.firstNameForm.value;
    this.userInfo.lastName = this.lastNameForm.value;
    this.userInfo.email = this.emailForm.value;
    this.userInfo.bankAccountName = this.bankAccountForm.value;
    this.userInfo.bankAccountNumber = this.bankAccountNumberForm.value;
    this.userInfo.slackAccount = this.slackAccount.value;
    this.userInfo.vat = this.isVat;
  }

  onReset() {
    this.getData();
  }

  onChangeTranscriptFile(event) {
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
      if (message) {
        this.ngOnInit();
      }
    });
  }

  onDownload() {
    const fileName = this.fileNamePdf;
    if (fileName) {
      this.worklogApiService.downloadTranscriptFile().subscribe(response => {
        this.downloadFile(response, fileName);
      }, err => {
        console.log(err);
      });
    }
  }

  onRemove() {

  }

  getEmitSource(event) {
    this.worklogApiService.getSitesData().subscribe(res => {
      const result = res.filter(val => val.name === event);
      this.userInfo.siteId = result[0].id;
    });
  }

  onCheckBoxVat(vatName) {
    this.isVat = (vatName === 'non-vat') ? 'N' : 'Y';
    this.vatList.map(data => {
      if (data.name !== vatName) {
        data.value = false;
      } else {
        data.value = true;
      }
    });
  }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  get getTranscriptFile(): MyFile {
    if (this.transcriptFile) {
      return {
        fileName: this.transcriptFile.name,
        fileItem: this.transcriptFile
      };
    } else if (this.userInfo && this.userInfo.transcript) {
      const fileName = this.userInfo.transcript.split('/');
      this.fileNamePdf = fileName[2];
      return {
        fileName: fileName[2],
        fileItem: null
      };
    } else {
      return {
        fileName: 'No file was chosen.',
        fileItem: null
      };
    }
  }

  get getImageFile(): MyFile {
    if (this.imageFile) {
      return {
        fileName: this.imageFile.name,
        fileItem: this.imageFile
      };
    }
    return { fileName: 'No file was chosen.', fileItem: null };
  }

  get hasOldTranscriptFileAtStart(): Boolean {
    return !this.oldTranscriptFile !== null && this.transcriptFile === null ? true : false;
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
