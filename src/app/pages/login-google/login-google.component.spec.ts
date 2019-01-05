import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceConfig } from 'angular-6-social-login';
import { of } from 'rxjs';
import { getAuthServiceConfigs } from '../../app.module';
import { WorklogApiService } from '../../core/worklog-api.service';
import { LoginGoogleComponent } from './login-google.component';

describe('LoginGoogleComponent', () => {
  let component: LoginGoogleComponent;
  let fixture: ComponentFixture<LoginGoogleComponent>;
  let workLogService: WorklogApiService;
  let socialAuthService: AuthService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginGoogleComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService,
        {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
        },
        WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    workLogService = TestBed.get(WorklogApiService);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call method socialSignIn loginwithGoogle', () => {
    socialAuthService = TestBed.get(AuthService);
    const res = {
      token: '1234567890',
      firstLogin: 'Y',
      idUser: '1234567890'
    };
    const dataPromiss = {
      idToken: '1234567890'
    };
    spyOn(socialAuthService, 'signIn').and.returnValue(Promise.resolve(dataPromiss));
    spyOn(workLogService, 'getLoginGoogle').and.returnValue(of(res));
    component.socialSignIn();
  });

  // it('should set individualListed, corporateListed when call cacheData()', () => {
  //   spyOn(workLogService, 'getListIncomeIndividual').and.returnValue(of(''));
  //   spyOn(workLogService, 'getListIncomeCorporate').and.returnValue(of(''));

  //   component.cacheData();

  //   expect(workLogService.getListIncomeIndividual).toHaveBeenCalled();
  //   expect(workLogService.getListIncomeCorporate).toHaveBeenCalled();
  //   expect(workLogService.individualListed).toBeDefined();
  //   expect(workLogService.corporateListed).toBeDefined();
  // });
});
