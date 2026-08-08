import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { User } from 'src/app/shared/model/user';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolTipSiteComponent } from './components/tool-tip-site/tool-tip-site.component';
import { UsersManagementComponent } from './users-management.component';


describe('UsersManagementComponent', () => {
  let component: UsersManagementComponent;
  let fixture: ComponentFixture<UsersManagementComponent>;
  let worklogApiService: WorklogApiService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersManagementComponent, ToolTipSiteComponent],
      imports: [NgbModule, HttpClientTestingModule, SharedModule],
      providers: [WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagementComponent);
    worklogApiService = TestBed.inject(WorklogApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsersData in worklogApiService when call getUsersData', () => {
    const mockResponse: User[] = [new User({
      id: '1233',
      role: 'individual',
      firstName: 'Odds',
      lastName: 'Odds',
      site: {
        id: '0001',
        name: 'SEC'
      },
      vat: '0',
      email: 'odds@odds.team',
      bankAccountName: 'ชวินธรสอง odds',
      bankAccountNumber: '112211221122',
      thaiCitizenId: '12345423',
      siteId: '',
      transcript: '',
      imageProfile: null,
      project: '',
      dailyIncome: '',
      address: 'every Where',
      statusTavi: true,
      degreeCertificate: '',
      idCard: '',
      phone: ''
    })];
    spyOn(worklogApiService, 'getUsersData').and.returnValue(of(mockResponse));
    component.getUsersData();
    expect(worklogApiService.getUsersData).toHaveBeenCalled();
  });

  it('component.user should equal to response from service when call getUsersData', () => {
    const mockResponse: User[] = [{
      id: '1233',
      role: 'individual',
      firstName: 'Odds',
      lastName: 'Odds',
      site: {
        id: '0001',
        name: 'SEC'
      },
      vat: '0',
      email: 'odds@odds.team',
      bankAccountName: 'ชวินธรสอง odds',
      bankAccountNumber: '112211221122',
      thaiCitizenId: '12345423',
      siteId: '',
      transcript: '',
      imageProfile: null,
      project: '',
      dailyIncome: '',
      address: 'every Where',
      statusTavi: true,
      degreeCertificate: '',
      idCard: '',
      phone: '',
      startDate : '2022-1-1',
      timesheetSynced: false

    }];
    spyOn(worklogApiService, 'getUsersData').and.returnValue(of(mockResponse));
    component.getUsersData();
    expect(component.users).toEqual(mockResponse);
  });

  it('should update user site in the list when onSiteChanged is called', () => {
    component.users = [{
      id: '1233',
      role: 'individual',
      firstName: 'Odds',
      lastName: 'Odds',
      site: { id: '0001', name: 'SEC' },
      vat: 'Y',
      email: 'odds@odds.team',
      bankAccountName: '',
      bankAccountNumber: '',
      thaiCitizenId: '',
      siteId: '',
      transcript: '',
      imageProfile: null,
      project: '',
      dailyIncome: '',
      address: '',
      statusTavi: true,
      degreeCertificate: '',
      idCard: '',
      phone: '',
      startDate: '',
      timesheetSynced: false
    }];
    component.sites = [
      { id: '0001', name: 'SEC' },
      { id: '0002', name: 'SET' },
    ];

    component.onSiteChanged({ userId: '1233', siteId: '0002' });

    expect(component.users[0].site).toEqual({ id: '0002', name: 'SET' });
    expect(component.users[0].siteId).toBe('0002');
  });
});