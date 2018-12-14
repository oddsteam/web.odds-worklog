import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { DropDownComponent } from 'src/app/shared/components/drop-down/drop-down.component';
import { Site } from 'src/app/shared/model/site';
import { EditProfileComponent } from './edit-profile.component';


describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let worklogApiService: WorklogApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileComponent, DropDownComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, FormsModule
        , RouterTestingModule, NgbModule.forRoot()],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    worklogApiService = TestBed.get(WorklogApiService);
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
    spyOn(component, 'getSiteData').and.returnValue(of(mockListSites));
    component.getData();
    expect(component.getSiteData).toHaveBeenCalled();
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
      transcript: null
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
    component.getSiteData();
    expect(component.site).toEqual(mockListSites[0].name);
  });
});
