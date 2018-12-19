import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { forkJoin } from 'rxjs';
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

  socialSignIn() {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        if (this.isOddsTeam(userData.email)) {
          this.loginGoogle(userData.idToken);
        }
      }
    );
  }

  private loginGoogle(idToken: string) {
    this.worklogService.getLoginGoogle(idToken).subscribe(res => {
      if (res.firstLogin === 'N') {
        sessionStorage.setItem('token', 'Bearer ' + res.token);
        sessionStorage.setItem('idUser', res.user.id);

        if (res.user.role === 'admin') {
          this.router.navigate(['corporate']);
        } else {
          this.router.navigate([res.user.role]);
        }
      } else {
        sessionStorage.setItem('token', 'Bearer ' + res.token);
        sessionStorage.setItem('idUser', res.user.id);
        this.router.navigate(['firstlogin']);
      }
      this.cacheData();
    });

  }

  private isOddsTeam(email: string): boolean {
    if (!email || email.length < 10) {
      alert('อีเมลไม่ถูกต้องครับ');
      return false;
    }

    const host = email.slice(-10);
    if (host !== '@odds.team') {
      alert('ไม่ใช่บัญชีของ odds.team ไม่สามารถเข้าใช้งานได้นะครับ ^_^');
      return false;
    }

    return true;
  }

  cacheData() {
    const individualListed = this.worklogService.getListIncomeIndividual();
    const corporateListed = this.worklogService.getListIncomeCorporate();

    forkJoin([corporateListed, individualListed]).subscribe(
      result => {
        this.worklogService.corporateListed = result[0];
        this.worklogService.individualListed = result[1];
      }
    );
  }
}
