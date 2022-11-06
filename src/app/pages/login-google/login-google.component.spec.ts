import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialAuthService} from '@abacritt/angularx-social-login';
import { of } from 'rxjs';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';
import { Login } from 'src/app/shared/model/login';
import { WorklogApiService } from '../../core/worklog-api.service';
import { LoginGoogleComponent } from './login-google.component';

describe('LoginGoogleComponent', () => {
  let component: LoginGoogleComponent;
  let fixture: ComponentFixture<LoginGoogleComponent>;
  let workLogService: WorklogApiService;
  const socialAuthService = createMockSocialAuthService(); 
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginGoogleComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        WorklogApiService,
        { provide: SocialAuthService, useValue: socialAuthService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    workLogService = TestBed.inject(WorklogApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set individualListed, corporateListed when call cacheData()', () => {
    spyOn(workLogService, 'getListIncomeIndividual').and.returnValue(of(new ListIncomeResponse()));
    spyOn(workLogService, 'getListIncomeCorporate').and.returnValue(of(new ListIncomeResponse()));

    component.cacheData();

    expect(workLogService.getListIncomeIndividual).toHaveBeenCalled();
    expect(workLogService.getListIncomeCorporate).toHaveBeenCalled();
    expect(workLogService.individualListed).toBeDefined();
    expect(workLogService.corporateListed).toBeDefined();
  });

  it('should be router navigate to corporate page when user login role admin', inject([Router], (router: Router) => {
    const result = <Login>{
      token: '123',
      firstLogin: 'N',
      user: { role: 'admin' }
    };
    spyOn(router, 'navigate');
    spyOn(workLogService, 'getLoginGoogle').and.returnValue(of(result));
    spyOn(workLogService, 'initDataService');
    spyOn(component, 'cacheData');
    component.loginGoogle('123');
    expect(workLogService.initDataService).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['corporate']);
    expect(component.cacheData).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['firstlogin']);
  }));

  it('should be router navigate to individual page when user login role individual', inject([Router], (router: Router) => {
    const result = <Login>{
      token: '123',
      firstLogin: 'N',
      user: { role: 'individual' }
    };
    spyOn(router, 'navigate');
    spyOn(workLogService, 'getLoginGoogle').and.returnValue(of(result));
    spyOn(workLogService, 'initDataService');
    spyOn(component, 'cacheData');
    component.loginGoogle('123');
    expect(workLogService.initDataService).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['individual']);
    expect(component.cacheData).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['firstlogin']);
  }));

  it('should be router navigate to first login page when first login status is Y ', inject([Router], (router: Router) => {
    const result = <Login>{
      token: '123',
      firstLogin: 'Y',
      user: { role: 'individual' }
    };
    spyOn(router, 'navigate');
    spyOn(workLogService, 'getLoginGoogle').and.returnValue(of(result));
    spyOn(workLogService, 'initDataService');
    component.loginGoogle('123');
    expect(workLogService.initDataService).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['firstlogin']);
  }));
});


export function createMockSocialAuthService() {
  const socialAuthService = jasmine.createSpyObj('SocialAuthService',
    ['authState']
  );
  socialAuthService.authState.subscribe = jasmine.createSpy();
  return socialAuthService;
}
