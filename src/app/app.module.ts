import { DatePipe } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { KeycloakInitService } from "./auth/keycloak-init.service";
import { SharedModule } from "./shared/shared.module";
import { ValidateCitizenIdUtil } from "./shared/utils/validate-citizenId.util";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    KeycloakAngularModule,
  ],
  providers: [
    ValidateCitizenIdUtil,
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, KeycloakInitService],
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthorizationInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initializeKeycloak(
  keycloak: KeycloakService,
  keycloakInitService: KeycloakInitService
) {
  return () => keycloakInitService.initializeKeycloak();
}
