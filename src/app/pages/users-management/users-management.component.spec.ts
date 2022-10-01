import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersManagementComponent, ToolTipSiteComponent],
      imports: [NgbModule.forRoot(), HttpClientTestingModule, SharedModule],
      providers: [WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagementComponent);
    worklogApiService = TestBed.get(WorklogApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsersData in worklogApiService when call getUsersData', () => {
    const mockResponse: User = {
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
      slackAccount: 'odds@odds.team',
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
    };
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
      slackAccount: 'odds@odds.team',
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
    }];
    spyOn(worklogApiService, 'getUsersData').and.returnValue(of(mockResponse));
    component.getUsersData();
    expect(component.users).toEqual(mockResponse);
  });
});
