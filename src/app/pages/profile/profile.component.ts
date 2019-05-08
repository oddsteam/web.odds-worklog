import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/core/file.service';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { Site } from 'src/app/shared/model/site';
import { User } from 'src/app/shared/model/user';
import { MyFile } from './file';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  fileForm: FormGroup;
  id = sessionStorage.getItem('idUser');
  transcriptFile: File = null;
  imageFile: File = null;
  degreeCertificateFile: File = null;
  idCardFile: File = null;
  oldTranscriptFile = null;
  urlDownloadTranscriptFile = null;
  dataListSite: Site[] = [];
  userInfo: User;
  personType: string;
  showSuccessMessage = false;
  fileNamePdf: string;
  isCorporate = false;
  listPersonType = [
    {
      id: 'corporate',
      name: 'Corporate'
    },
    {
      id: 'individual',
      name: 'Individual'
    }
  ];

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
    private fileService: FileService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getData();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      corporateName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      bankAccount: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      slackAccount: ['', Validators.required],
      project: [''],
      dailyIncome: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.required],
      thaiCitizenId: ['', Validators.required]
    });

    this.fileForm = this.formBuilder.group({
      transcriptFile: [null],
      imageFile: [null],
      degreeCertificateFile: [null],
      idCardFile: [null]
    });
  }

  getData() {
    this.worklogApiService.getUserByID(this.id).subscribe(user => {
      this.setDataUser(user);
      if (user.role === 'corporate') {
        this.isCorporate = true;
      }
    });
  }

  private setDataUser(user: User) {
    this.userInfo = user;
    this.personType = user.role;
    this.corporateNameForm.setValue(user.corporateName);
    this.firstNameForm.setValue(user.firstName);
    this.lastNameForm.setValue(user.lastName);
    this.emailForm.setValue(user.email);
    this.bankAccountForm.setValue(user.bankAccountName);
    this.bankAccountNumberForm.setValue(user.bankAccountNumber);
    this.slackAccount.setValue(user.slackAccount);
    this.project.setValue(user.project);
    this.dailyIncome.setValue(user.dailyIncome);
    this.address.setValue(user.address);
    this.thaiCitizenId.setValue(user.thaiCitizenId);
    this.isVat = user.vat;
    if (user.vat === 'N') {
      this.vatList[0].value = false;
      this.vatList[1].value = true;
    }
    this.getNameSite();
  }

  getNameSite() {
    this.worklogApiService.getSitesData().subscribe(res => {
      this.dataListSite = res;
      this.site = this.userInfo.siteId;
    });
  }

  updateData() {
    if (this.dailyIncome.valid) {
      this.setDataToModel();
      this.worklogApiService.setDailyIncoem(this.userInfo.dailyIncome);
      this.worklogApiService.updateUser(this.id, this.userInfo).subscribe(user => {
        this.setDataUser(user);
        this.triggerHeader();
        this.alertSuccess();
      });
      this.stateService.setTypeUser(this.personType);
    }
  }

  private alertSuccess() {
    this.showSuccessMessage = true;
    window.scrollTo(0, 0);
  }

  setDataToModel() {
    this.userInfo.corporateName = this.corporateNameForm.value;
    this.userInfo.firstName = this.firstNameForm.value;
    this.userInfo.lastName = this.lastNameForm.value;
    this.userInfo.email = this.emailForm.value;
    this.userInfo.bankAccountName = this.bankAccountForm.value;
    this.userInfo.bankAccountNumber = this.bankAccountNumberForm.value;
    this.userInfo.slackAccount = this.slackAccount.value;
    this.userInfo.vat = this.isVat;
    this.userInfo.project = this.project.value;
    this.userInfo.dailyIncome = this.dailyIncome.value;
    this.userInfo.role = this.personType;
    this.userInfo.address = this.address.value;
    this.userInfo.thaiCitizenId = this.thaiCitizenId.value;
  }

  onReset() {
    this.getData();
  }

  onChangeImageFile(event) {
    const file = event.target.files[0];
    this.imageFile = event.target.files[0];
    if (file) {
      this.onSubmit(file, 'image');
    }
  }

  onChangeTranscriptFile(event) {
    const file = event.target.files[0];
    this.transcriptFile = event.target.files[0];
    if (file) {
      this.onSubmit(file, 'transcript');
    }
  }

  onChangeDegreeCertificateFile(event) {
    const file = event.target.files[0];
    this.degreeCertificateFile = event.target.files[0];
    if (file) {
      this.onSubmit(file, 'degreecertificate');
    }
  }

  onChangeIdCardFile(event) {
    const file = event.target.files[0];
    this.idCardFile = event.target.files[0];
    if (file) {
      this.onSubmit(file, 'idcard');
    }
  }

  onSubmit(file, type) {
    if (type === 'transcript') {
      this.fileService.uploadFileTranscript(file).subscribe(response => {
        const message = response['message'];
        alert(message);
        if (message) {
          this.onReset();
        }
      }, err => alert('Upload Transcript failed.'));
    } else if (type === 'image') {
      this.fileService.uploadImageProfile(file).subscribe(response => {
        this.triggerHeader();
        const message = response['message'];
        alert(message);
        if (message) {
          this.onReset();
        }
      }, err => alert('Upload image profile failed.'));
    } else if (type === 'degreecertificate') {
      this.fileService.uploadDegreeCertificate(file).subscribe(response => {
        this.triggerHeader();
        const message = response['message'];
        alert(message);
        if (message) {
          this.onReset();
        }
      }, err => alert('Upload degree certificate failed.'));
    } else {
      this.fileService.uploadIdCard(file).subscribe(response => {
        this.triggerHeader();
        const message = response['message'];
        alert(message);
        if (message) {
          this.onReset();
        }
      }, err => alert('Upload id card failed.'));
    }
  }

  onDownload(type) {
    if (type === 'transcript') {
      const fileName = this.getTranscriptFile.fileName;
      this.fileService.downloadTranscriptFile().subscribe(response => {
        this.downloadFile(response, fileName);
      }, err => alert('Download Transcript failed.'));
    } else {
      const fileName = this.getImageFile.fileName;
      this.fileService.downloadImageProFile().subscribe(response => {
        this.downloadFile(response, fileName);
      }, err => alert('Download image profile failed.'));
    }
  }

  onRemove(type) {
    if (type === 'transcript') {
      this.fileService.removeTranscript().subscribe(response => {
        alert(response['message']);
        this.onReset();
        this.transcriptFile = null;
      }, err => alert('Remove Transcript failed.'));
    } else {
      this.fileService.removeImage().subscribe(response => {
        alert(response['message']);
        this.onReset();
        this.imageFile = null;
        this.triggerHeader();
      }, err => alert('Remove image profile failed.'));
    }
  }

  getEmitSourceSite(event) {
    this.userInfo.siteId = event.id;
  }

  getEmitSourcePersonType(event) {
    if (event === 'individual' || event === 'corporate') {
      this.personType = event;
      this.isCorporate = (event === 'individual') ? false : true;
    }
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
    const url = window.URL.createObjectURL(data);
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
    } else if (this.userInfo && this.userInfo.imageProfile) {
      const fileName = this.userInfo.imageProfile.split('/');
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

  get getDegreeCertificateFile(): MyFile {
    if (this.degreeCertificateFile) {
      return {
        fileName: this.degreeCertificateFile.name,
        fileItem: this.idCardFile
      };
    } else if (this.userInfo && this.userInfo.degreeCertificate) {
      const fileName = this.userInfo.degreeCertificate.split('/');
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

  get getIdCardFile(): MyFile {
    if (this.idCardFile) {
      return {
        fileName: this.idCardFile.name,
        fileItem: this.idCardFile
      };
    } else if (this.userInfo && this.userInfo.idCard) {
      const fileName = this.userInfo.idCard.split('/');
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

  get hasOldTranscriptFileAtStart(): Boolean {
    return !this.oldTranscriptFile !== null && this.transcriptFile === null ? true : false;
  }

  get corporateNameForm(): FormControl {
    return this.profileForm.get('corporateName') as FormControl;
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

  get project(): FormControl {
    return this.profileForm.get('project') as FormControl;
  }

  get dailyIncome(): FormControl {
    return this.profileForm.get('dailyIncome') as FormControl;
  }

  get address(): FormControl {
    return this.profileForm.get('address') as FormControl;
  }

  get thaiCitizenId(): FormControl {
    return this.profileForm.get('thaiCitizenId') as FormControl;
  }

  private triggerHeader() {
    this.stateService.triggerHeader();
  }
}
