import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { environment } from "./keycloak.config";

@Injectable({
  providedIn: "root",
})
export class KeycloakInitService {
  constructor(private keycloakService: KeycloakService) {}

  async initializeKeycloak(): Promise<boolean> {
    try {
      await this.keycloakService.init({
        config: environment.keycloak,
        initOptions: {
          onLoad: "check-sso",
          silentCheckSsoRedirectUri:
            window.location.origin + "/assets/silent-check-sso.html",
          checkLoginIframe: false,
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: [
          "/assets",
          "http://localhost:8080/",
          "https://worklog-dev.odds.team/api/",
          "https://worklog.odds.team/api/",
        ],
      });
      return true;
    } catch (error) {
      console.error("Keycloak initialization failed:", error);
      return false;
    }
  }
}
