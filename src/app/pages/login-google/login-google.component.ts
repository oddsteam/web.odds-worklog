import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

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
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform + ' sign in data : ', userData);
          sessionStorage.setItem('email', userData.email);
          this.worklogService.getLoginGoogle(userData.idToken).subscribe(res => {
            if (res.firstLogin === 'N') {
              sessionStorage.setItem('token', 'Bearer ' + res.token);
              sessionStorage.setItem('firstLogin', res.firstLogin);

              this.router.navigate(['corporate']);
            } else {
              sessionStorage.setItem('token', 'Bearer ' + res.token);
              sessionStorage.setItem('firstLogin', res.firstLogin);
              sessionStorage.setItem('idUser', res.idUser);
              this.router.navigate(['firstlogin']);
            }
          });

        }
      );
    }

  }
}
