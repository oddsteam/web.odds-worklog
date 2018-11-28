// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
// import { of } from 'rxjs';
// import { getAuthServiceConfigs } from '../../app.module';
// import { WorklogApiService } from '../../core/worklog-api.service';
// import { LoginGoogleComponent } from './login-google.component';


// describe('LoginGoogleComponent', () => {
//   let component: LoginGoogleComponent;
//   let fixture: ComponentFixture<LoginGoogleComponent>;
//   let workLogService: WorklogApiService;
//   let socialAuthService: AuthService;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [LoginGoogleComponent],
//       imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
//       providers: [AuthService,
//         {
//           provide: AuthServiceConfig,
//           useFactory: getAuthServiceConfigs
//         },
//       WorklogApiService]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginGoogleComponent);
//     component = fixture.componentInstance;
//     workLogService = TestBed.get(WorklogApiService);
//     socialAuthService = TestBed.get(AuthService);
//   });

//   it('should be call method socialSignIn loginwithGoogle', inject([Router], (router: Router) => {
//     spyOn(router, 'navigate');
//     const res = {
//       token: '1234567890',
//       firstLogin: 'Y',
//       idUser: '1234567890'
//     };
//     const dataPromiss = {
//       idToken: '1234567890'
//     };
//     spyOn(socialAuthService, 'signIn').and.returnValue(Promise.resolve(dataPromiss));
//     spyOn(workLogService, 'getLoginGoogle').and.returnValue(of(res));
//     component.socialSignIn();
//     expect(router.navigate).toHaveBeenCalledWith(['firstlogin']);

//   }));
// });
