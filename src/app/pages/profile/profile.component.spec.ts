import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { DropDownComponent } from 'src/app/shared/components/drop-down/drop-down.component';
import { Site } from 'src/app/shared/model/site';
import { User } from 'src/app/shared/model/user';
import { ProfileComponent } from './profile.component';
import { FileService } from 'src/app/core/file.service';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let worklogApiService: WorklogApiService;
  let fileService: FileService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent, DropDownComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, FormsModule
        , RouterTestingModule, NgbModule.forRoot()],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    worklogApiService = TestBed.get(WorklogApiService);
    fileService = TestBed.get(FileService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call getUserByID expect data in form control to change', () => {
    const data = {
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      slackAccount: 'who@odds.team',
      vat: 'N',
      transcript: null
    };

    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
    component.getData();
    expect(component.firstNameForm.value).toEqual('aaa');
    expect(component.lastNameForm.value).toEqual('bbb');
    expect(component.emailForm.value).toEqual('who@odds.team');
    expect(component.bankAccountForm.value).toEqual('กอไก่ ขอไข่');
    expect(component.bankAccountNumberForm.value).toEqual('0123456789');
    expect(component.slackAccount.value).toEqual('who@odds.team');

  });

  it('should call getSiteData in worklog service when call getData()', () => {
    const data = {
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      slackAccount: 'who@odds.team',
      vat: 'N',
    };
    const mockListSites: Site[] = [
      {
        id: '5c0fb860f37e2f8698989cdd',
        name: 'SEC'
      },
      {
        id: '5c0fb860f37e2f8698989cff',
        name: 'DTAC'
      },
      {
        id: '5c0fb860f37e2f8698989vcd',
        name: 'SET'
      },
    ];
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
    spyOn(component, 'getNameSite').and.returnValue(of(mockListSites));
    component.getData();
    expect(component.getNameSite).toHaveBeenCalled();
  });

  it('component.site should equal to user info', () => {
    component.userInfo = {
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      slackAccount: 'who@odds.team',
      siteId: '5c0fb860f37e2f8698989cdd',
      vat: 'N',
      site: {
        id: '5c0fb860f37e2f8698989cdd',
        name: 'SEC'
      },
      thaiCitizenId: '112233445566',
      transcript: null,
      imageProfile: null,
      project: ''
    };
    const mockListSites: Site[] = [
      {
        id: '5c0fb860f37e2f8698989cdd',
        name: 'SEC'
      },
      {
        id: '5c0fb860f37e2f8698989cff',
        name: 'DTAC'
      },
      {
        id: '5c0fb860f37e2f8698989vcd',
        name: 'SET'
      },
    ];
    spyOn(worklogApiService, 'getSitesData').and.returnValue(of(mockListSites));
    component.getNameSite();
    expect(component.site).toEqual(mockListSites[0].id);
  });
  it('should call onSubmit if file is not undifined', () => {
    const file = {
      target: {
        files: [
          { name: 'xxx.pdf' }
        ]
      }
    };
    spyOn(component, 'onSubmit');
    component.onChangeTranscriptFile(file);
    expect(component.onSubmit).toHaveBeenCalledWith(file.target.files[0], 'transcript');
  });

  it('should call uploadFileTranscript in service', () => {
    const file = {
      target: {
        files: [
          { name: 'xxx.pdf' }
        ]
      }
    };
    spyOn(fileService, 'uploadFileTranscript').and.returnValues(of('message'));
    component.onSubmit(file, 'transcript');
    expect(fileService.uploadFileTranscript).toHaveBeenCalledWith(file);
  });

  // onReset Test

  it('should call updateUser in worklog service correctly', () => {
    const mockResponse: User = {
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      slackAccount: 'who@odds.team',
      siteId: '5c0fb860f37e2f8698989cdd',
      vat: 'N',
      site: {
        id: '5c0fb860f37e2f8698989cdd',
        name: 'SEC'
      },
      thaiCitizenId: '112233445566',
      transcript: null,
      imageProfile: null,
      project: ''
    };
    component.userInfo = new User();
    component.id = mockResponse.id;
    component.profileForm.setValue({
      firstName: 'ODDS',
      lastName: 'ODDS',
      email: 'odds@odds.team',
      bankAccount: 'odds odds',
      bankAccountNumber: '1122334455',
      slackAccount: 'odds@odds.team',
      project: ''
    });
    fixture.detectChanges();
    spyOn(worklogApiService, 'updateUser').and.returnValue(of(mockResponse));
    component.updateData();
    expect(worklogApiService.updateUser).toHaveBeenCalled();
  });

  it('when call onReset() must call getData()', () => {
    spyOn(component, 'getData');
    component.onReset();
    expect(component.getData).toHaveBeenCalled();
  });

  it('should call uploadImageProfile in file service', () => {
    const mockFile = {
      target: {
        files: [
          { name: 'xxx.pdf' }
        ]
      }
    };
    spyOn(fileService, 'uploadImageProfile').and.returnValue(of('message'));
    component.onChangeImageFile(mockFile);
    expect(fileService.uploadImageProfile).toHaveBeenCalledTimes(1);
  });

  it('should call downloadTranscriptFile in file service when call onDownload', () => {
    const data = {
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      slackAccount: 'who@odds.team',
      vat: 'N',
      transcript: null,
      imageProfile: null
    };
    // get user data
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
    component.getData();

    component.userInfo.transcript = 'files/transcripts/ww_ww_Zt0mUDwp7LBx.pdf';
    spyOn(fileService, 'downloadTranscriptFile').and.returnValue(of(new Blob));
    component.onDownload('transcript');
    expect(fileService.downloadTranscriptFile).toHaveBeenCalled();
  });

  it('if downloadTranscriptFile in file service is success it should call downloadFile', () => {
    const data = {
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      slackAccount: 'who@odds.team',
      vat: 'N',
      transcript: null,
      imageProfile: null
    };
    // get user data
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
    component.getData();

    component.userInfo.transcript = 'files/transcripts/ww_ww_Zt0mUDwp7LBx.pdf';
    const mockResponse = new Blob();
    spyOn(fileService, 'downloadTranscriptFile').and.returnValue(of(mockResponse));
    spyOn(component, 'downloadFile');
    component.onDownload('transcript');
    expect(component.downloadFile).toHaveBeenCalledWith(mockResponse, 'ww_ww_Zt0mUDwp7LBx.pdf');
  });

  it('should set user site id when call getEmitSource', () => {
    const data = {
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      slackAccount: 'who@odds.team',
      vat: 'N',
      transcript: null,
      imageProfile: null,
      siteId: '5c0fb860f37e2f8698989cff'
    };
    // get user data
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
    component.getData();
    component.getEmitSource({ id: '5c0fb860f37e2f8698989cf0' });
    expect(component.userInfo.siteId).toEqual('5c0fb860f37e2f8698989cf0');
  });

  it('isVat should be Y if param in onCheckBoxVat is "vat"', () => {
    component.onCheckBoxVat('vat');
    expect(component.isVat).toEqual('Y');
  });

  it('vatList should have be swapping value of element in vatlist when call onCheckBoxVat', () => {
    expect(component.vatList[0].value).toBeTruthy();
    expect(component.vatList[1].value).toBeFalsy();
    component.onCheckBoxVat('non-vat');
    expect(component.vatList[0].value).toBeFalsy();
    expect(component.vatList[1].value).toBeTruthy();
  });
});
