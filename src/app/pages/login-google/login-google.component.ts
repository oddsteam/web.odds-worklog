import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { WorklogApiService } from "src/app/core/worklog-api.service";
import { Login } from "src/app/shared/model/login";
import { KeycloakService } from "keycloak-angular";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: "app-login-google",
  templateUrl: "./login-google.component.html",
  styleUrls: ["./login-google.component.scss"],
})
export class LoginGoogleComponent implements OnInit {
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private worklogService: WorklogApiService,
    private keycloakService: KeycloakService
  ) {}
  keycloakJwtToken = "";

  ngOnInit() {
    this.keycloakService.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.keycloakService.getToken().then((token) => {
          const decodedToken = jwtDecode(token);
          this.keycloakJwtToken = JSON.stringify(decodedToken);
          this.authenticateWithBackend(token);
        });
      }
    });
    this.socialAuthService.authState.subscribe((userData: SocialUser) => {
      if (userData && this.isOddsTeam(userData.email)) {
        this.loginGoogle(userData.idToken);
      }
    });
  }

  loginGoogle(idToken: string) {
    this.worklogService.getLoginGoogle(idToken).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => {
        console.log("before calling handle error");
        this.handleError(err);
      },
    });
  }

  authenticateWithBackend(idToken: string) {
    this.worklogService.loginWithKeycloak(idToken).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err) => {
        console.log("before calling handle error");
        this.handleError(err);
      },
    });
  }

  private handleSuccess(res: Login) {
    sessionStorage.setItem("token", "Bearer " + res.token);
    this.worklogService.initDataService();
    sessionStorage.setItem("idUser", res.user.id);
    sessionStorage.setItem("firstName", res.user.firstName);
    sessionStorage.setItem("role", res.user.role);
    if (res.firstLogin === "N") {
      if (res.user.role === "admin") {
        this.router.navigate(["corporate"]);
      } else {
        this.router.navigate([res.user.role]);
      }
      this.cacheData();
    } else {
      this.router.navigate(["firstlogin"]);
    }
  }

  private handleError(err) {
    alert(err.message);
    console.log(err);
  }

  private isOddsTeam(email: string): boolean {
    if (!email || email.length < 10) {
      alert("Email is invalid.");
      return false;
    }

    const host = email.slice(-10);
    if (host !== "@odds.team") {
      alert(`Sorry, account isn't Odds Team.`);
      return false;
    }

    return true;
  }

  cacheData() {
    const individualListed = this.worklogService.getListIncomeIndividual();
    const corporateListed = this.worklogService.getListIncomeCorporate();

    forkJoin([corporateListed, individualListed]).subscribe((result) => {
      this.worklogService.corporateListed = result[0];
      this.worklogService.individualListed = result[1];
    });
  }

  async loginWithKeycloak() {
    try {
      await this.keycloakService.login();
    } catch (error) {
      console.error("Keycloak login failed:", error);
    }
  }
}
