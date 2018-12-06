import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { FirstLogin } from '../../shared/model/user-model';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnInit {
  constructor(private socialAuthService: AuthService,
    private router: Router,
    private worklogService: WorklogApiService
  ) { }

  ngOnInit() {
  }
  socialSignIn() {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        const firstLogin = new FirstLogin();
        firstLogin.email = userData.email;
        this.worklogService.getLoginGoogle(userData.idToken).subscribe(res => {
          if (res.firstLogin === 'N') {
            sessionStorage.setItem('token', 'Bearer ' + res.token);
            firstLogin.firstLogin = res.firstLogin;
            this.worklogService.setFirstLogin(firstLogin);
            sessionStorage.setItem('idUser', res.idUser);
            this.router.navigate(['corporate']);
          } else {
            sessionStorage.setItem('token', 'Bearer ' + res.token);
            firstLogin.firstLogin = res.firstLogin;
            this.worklogService.setFirstLogin(firstLogin);
            sessionStorage.setItem('idUser', res.idUser);
            this.router.navigate(['firstlogin']);
          }
        });

      }
    );

  }
}
