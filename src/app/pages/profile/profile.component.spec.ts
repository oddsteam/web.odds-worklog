import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { of } from 'rxjs';
import { FileService } from 'src/app/core/file.service';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { DropDownComponent } from 'src/app/shared/components/drop-down/drop-down.component';
import { MessageTooltipComponent } from 'src/app/shared/components/message-tooltip/message-tooltip.component';
import { Site } from 'src/app/shared/model/site';
import { User } from 'src/app/shared/model/user';
import { ValidateCitizenIdUtil } from 'src/app/shared/utils/validate-citizenId.util';
import { ProfileComponent } from './profile.component';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let worklogApiService: WorklogApiService;
  let fileService: FileService;
  let stateService: StateService;
  let modalService: BsModalService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent, DropDownComponent, MessageTooltipComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, FormsModule
        , RouterTestingModule, NgbModule],
      providers: [ValidateCitizenIdUtil, BsModalService, ComponentLoaderFactory, PositioningService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    worklogApiService = TestBed.inject(WorklogApiService);
    fileService = TestBed.inject(FileService);
    stateService = TestBed.inject(StateService);
    modalService = TestBed.inject(BsModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call getUserByID expect data in form control to change', () => {
    const data = new User({
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      vat: 'N',
      transcript: null,
      thaiCitizenId: '123467890',
      phone: '',
      startDate: '2022-1-1'
    });

    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
    component.getData();
    expect(component.firstNameForm.value).toEqual('aaa');
    expect(component.lastNameForm.value).toEqual('bbb');
    expect(component.emailForm.value).toEqual('who@odds.team');
    expect(component.bankAccountForm.value).toEqual('กอไก่ ขอไข่');
    expect(component.bankAccountNumberForm.value).toEqual('0123456789');

  });

  it('should call getSiteData in worklog service when call getData()', () => {
    const data = new User({
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      vat: 'N',
      thaiCitizenId: '123467890',
      phone: '',
      startDate: '2022-1-1'
    });
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
    ] as Site[];
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
    spyOn(worklogApiService, 'getSitesData').and.returnValue(of(mockListSites));
    component.getData();
    expect(worklogApiService.getSitesData).toHaveBeenCalled();
  });

  it('component.site should equal to user info', () => {
    component.userInfo = {
      timesheetSynced: false,
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      siteId: '5c0fb860f37e2f8698989cdd',
      vat: 'N',
      site: {
        id: '5c0fb860f37e2f8698989cdd',
        name: 'SEC'
      },
      thaiCitizenId: '112233445566',
      transcript: null,
      imageProfile: null,
      project: '',
      dailyIncome: '14',
      address: 'every Where',
      statusTavi: true,
      degreeCertificate: null,
      idCard: null,
      phone: '',
      startDate: '2022-1-1'
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
    spyOn(fileService, 'uploadFileTranscript').and.returnValues(of({ message: 'message' }));
    component.onSubmit(file, 'transcript');
    expect(fileService.uploadFileTranscript).toHaveBeenCalledWith(file);
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
    spyOn(fileService, 'uploadImageProfile').and.returnValues(of({ message: 'message' }));
    component.onChangeImageFile(mockFile);
    expect(fileService.uploadImageProfile).toHaveBeenCalledTimes(1);
  });

  it('should call uploadDegreeCertificate in file service', () => {
    const mockFile = {
      target: {
        files: [
          { name: 'xxx.pdf' }
        ]
      }
    };
    spyOn(fileService, 'uploadDegreeCertificate').and.returnValue(of({ message: 'message' }));
    component.onChangeDegreeCertificateFile(mockFile);
    expect(fileService.uploadDegreeCertificate).toHaveBeenCalledTimes(1);
  });

  it('should call uploadIdCard in file service', () => {
    const mockFile = {
      target: {
        files: [
          { name: 'xxx.pdf' }
        ]
      }
    };
    spyOn(fileService, 'uploadIdCard').and.returnValue(of({ message: 'message' }));
    component.onChangeIdCardFile(mockFile);
    expect(fileService.uploadIdCard).toHaveBeenCalledTimes(1);
  });

  it('should call downloadTranscriptFile in file service when call onDownload', () => {
    const data = new User({
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      vat: 'N',
      transcript: null,
      imageProfile: null,
      thaiCitizenId: '123467890',
      phone: '',
      startDate: '2022-1-1'
    });
    // get user data
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
    component.getData();

    component.userInfo.transcript = 'files/transcripts/ww_ww_Zt0mUDwp7LBx.pdf';
    spyOn(fileService, 'downloadTranscriptFile').and.returnValue(of(new Blob));
    component.onDownload('transcript');
    expect(fileService.downloadTranscriptFile).toHaveBeenCalled();
  });

  it('if downloadTranscriptFile in file service is success it should call downloadFile', () => {
    const data = new User({
      bankAccountName: 'กอไก่ ขอไข่',
      bankAccountNumber: '0123456789',
      email: 'who@odds.team',
      firstName: 'aaa',
      id: '5c0fa703780bf500019a5aea',
      lastName: 'bbb',
      role: 'admin',
      vat: 'N',
      transcript: null,
      imageProfile: null,
      thaiCitizenId: '123467890',
      phone: '',
      startDate: '2022-1-1'
    });
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


  describe('getEmitSourceSite', () => {
    it('should set user site id when call getEmitSource', () => {
      const data = new User({
        bankAccountName: 'กอไก่ ขอไข่',
        bankAccountNumber: '0123456789',
        corporateName: 'บอบอ',
        email: 'who@odds.team',
        firstName: 'aaa',
        id: '5c0fa703780bf500019a5aea',
        lastName: 'bbb',
        role: 'admin',
        vat: 'N',
        transcript: null,
        imageProfile: null,
        siteId: '5c0fb860f37e2f8698989cff',
        thaiCitizenId: '123467890',
        phone: '',
        startDate: '2022-1-1'
      });
      // get user data
      spyOn(worklogApiService, 'getUserByID').and.returnValue(of(data));
      component.getData();
      component.getEmitSourceSite('5c0fb860f37e2f8698989cf0');
      expect(component.userInfo.siteId).toEqual('5c0fb860f37e2f8698989cf0');
    });
  });

  describe('updateData', () => {
    let mockResponse = new User();
    beforeEach(() => {
      mockResponse = {
        timesheetSynced: false,
        bankAccountName: 'กอไก่ ขอไข่',
        bankAccountNumber: '0123456789',
        email: 'who@odds.team',
        firstName: 'aaa',
        id: '5c0fa703780bf500019a5aea',
        lastName: 'bbb',
        role: 'corporate',
        siteId: '5c0fb860f37e2f8698989cdd',
        vat: 'N',
        site: {
          id: '5c0fb860f37e2f8698989cdd',
          name: 'SEC'
        },
        thaiCitizenId: '112233445566',
        transcript: null,
        imageProfile: null,
        project: '',
        dailyIncome: '14',
        address: 'every Where',
        statusTavi: true,
        degreeCertificate: null,
        idCard: null,
        phone: null,
        startDate: '2022-1-1'
      };
      component.userInfo = new User({
        startDate: '2022-1-1'
      });
      component.id = mockResponse.id;
      component.profileForm.setValue({
        firstName: 'ODDS',
        lastName: 'ODDS',
        corporateName: 'บอบอ',
        email: 'odds@odds.team',
        bankAccount: 'odds odds',
        bankAccountNumber: '1122334455',
        project: '',
        dailyIncome: '14',
        address: 'every Where',
        thaiCitizenId: '123467890',
        vat: 'N',
        phone: '0123123123',
        startDate: { year: 2022, month: 1, day: 1 }

      });
    });

    it('should call updateUser in worklog service correctly', () => {
      fixture.detectChanges();
      component.profileForm = <FormGroup>{
        valid: true
      };

      spyOn(component, 'setDataToModel');
      spyOn(worklogApiService, 'setDailyIncoem');
      spyOn(worklogApiService, 'updateUser').and.returnValue(of(mockResponse));
      spyOn(component, 'setDataUser');
      spyOn(component, 'triggerHeader');
      spyOn(component, 'alertSuccess');
      spyOn(modalService, 'show');

      component.updateData();

      expect(component.setDataToModel).toHaveBeenCalled();
      expect(worklogApiService.setDailyIncoem).toHaveBeenCalled();
      expect(worklogApiService.updateUser).toHaveBeenCalled();
      expect(component.setDataUser).toHaveBeenCalled();
      expect(component.triggerHeader).toHaveBeenCalled();
      expect(component.alertSuccess).toHaveBeenCalled();
    });

    it('should set type user = person type', () => {
      component.userInfo = new User();
      component.vat.setValue('N');
      component.profileForm = <FormGroup>{
        valid: true,
      };
      component.personType = 'corporate';
      spyOn(component, 'setDataToModel');
      spyOn(worklogApiService, 'setDailyIncoem');
      spyOn(worklogApiService, 'updateUser').and.returnValue(of(mockResponse));
      spyOn(component, 'setDataUser');
      spyOn(component, 'triggerHeader');
      spyOn(component, 'alertSuccess');
      spyOn(stateService, 'setTypeUser');
      spyOn(modalService, 'show');

      component.updateData();

      expect(component.setDataToModel).toHaveBeenCalled();
      expect(worklogApiService.setDailyIncoem).toHaveBeenCalled();
      expect(worklogApiService.updateUser).toHaveBeenCalled();
      expect(component.setDataUser).toHaveBeenCalled();
      expect(component.triggerHeader).toHaveBeenCalled();
      expect(component.alertSuccess).toHaveBeenCalled();
      expect(stateService.setTypeUser).toHaveBeenCalledWith('corporate');
    });

    it('should open income reminder modal after update succeeds', () => {
      component.userInfo = new User();
      component.vat.setValue('N');
      component.profileForm = <FormGroup>{
        valid: true,
      };
      component.personType = 'individual';
      spyOn(component, 'setDataToModel');
      spyOn(worklogApiService, 'setDailyIncoem');
      spyOn(worklogApiService, 'updateUser').and.returnValue(of(mockResponse));
      spyOn(component, 'setDataUser');
      spyOn(component, 'triggerHeader');
      spyOn(component, 'alertSuccess');
      spyOn(modalService, 'show');

      component.updateData();

      expect(modalService.show).toHaveBeenCalledWith(
        component.incomeReminderModal,
        { ignoreBackdropClick: true }
      );
    });

    it('should hide modal when closeIncomeReminder is called', () => {
      component.modalRef = { hide: jasmine.createSpy('hide') } as any;

      component.closeIncomeReminder();

      expect(component.modalRef.hide).toHaveBeenCalled();
    });
  });

  describe('getEmitSoucrePersonType', () => {
    it('should set is coporate to true when event is corporate', () => {
      const event = 'corporate';

      component.getEmitSourcePersonType(event);

      expect(component.isCorporate).toBe(true);
    });

    it('should set is coporate to false when event is individual', () => {
      const event = 'individual';

      component.getEmitSourcePersonType(event);

      expect(component.isCorporate).toBe(false);
    });

    it('should set person type to corporate when event is corporate', () => {
      const event = 'corporate';

      component.getEmitSourcePersonType(event);

      expect(component.personType).toEqual('corporate');
    });

    it('should set person type to individual when event is individual', () => {
      const event = 'individual';

      component.getEmitSourcePersonType(event);

      expect(component.personType).toEqual('individual');
    });

    it('ทดสอบเรียกฟังชั่น setDataToModel หากทำการเรียกแล้วจะทำการ set ค่าต่างๆ ลง userInfo', () => {
      component.userInfo = new User();
      component.createForm();
      component.corporateNameForm.setValue('');
      component.firstNameForm.setValue('ทดสอบ');
      component.lastNameForm.setValue('ชอบลงทุน');
      component.emailForm.setValue('test@abc.com');
      component.bankAccountForm.setValue('ทดสอบ ชอบลงทุน');
      component.bankAccountNumberForm.setValue('1235678900');
      component.vat.setValue('N');
      component.project.setValue('TEST');
      component.dailyIncome.setValue('4000');
      component.personType = 'individual'
      component.address.setValue('-');
      component.thaiCitizenId.setValue('-');
      component.phone.setValue('-');
      component.setDataToModel();
    });

  });
});
