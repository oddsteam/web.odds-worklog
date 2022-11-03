import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
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

  loginGoogle(idToken: string) {
    this.worklogService.getLoginGoogle(idToken).subscribe(res => {
      sessionStorage.setItem('token', 'Bearer ' + res.token);
      this.worklogService.initDataService();
      sessionStorage.setItem('idUser', res.user.id);
      sessionStorage.setItem('firstName', res.user.firstName);
      sessionStorage.setItem('role', res.user.role);
      if (res.firstLogin === 'N') {
        if (res.user.role === 'admin') {
          this.router.navigate(['corporate']);
        } else {
          this.router.navigate([res.user.role]);
        }
        this.cacheData();
      } else {
        this.router.navigate(['firstlogin']);
      }
    });

  }

  private isOddsTeam(email: string): boolean {
    if (!email || email.length < 10) {
      alert('Email is invalid.');
      return false;
    }

    const host = email.slice(-10);
    if (host !== '@odds.team') {
      alert(`Sorry, account isn't Odds Team.`);
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
