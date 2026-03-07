import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { FileService } from "src/app/core/file.service";
import { StateService } from "src/app/core/state.service";
import { WorklogApiService } from "src/app/core/worklog-api.service";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  name: string;
  imageProfile: SafeUrl;
  id = sessionStorage.getItem("idUser");
  taviStatus = false;
  role: string;

  constructor(
    public translate: TranslateService,
    private worklogApiService: WorklogApiService,
    private stateService: StateService,
    private router: Router,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private keycloakService: KeycloakService
  ) {
    translate.setDefaultLang("en");
    translate.use("th");
  }

  ngOnInit() {
    this.worklogApiService
      .forCheckTokenPleaseRemoveMeIfFlowLoginFinnished()
      .subscribe(() => {
        this.getUserID(), this.getUserIncome();
      });

    this.stateService.headerTrigger.subscribe((data) => {
      this.getUserID();
    });
  }

  getUserID() {
    this.worklogApiService.getUserByID(this.id).subscribe((res) => {
      if (res.role === "corporate") {
        this.name = res.corporateName;
      } else {
        this.name = res.firstName + " " + res.lastName;
      }
      this.role = res.role;
      this.taviStatus = res.statusTavi;
      this.stateService.setTypeUser(res.role);
      this.stateService.setFlagVat(res.vat);
      if (res.imageProfile) {
        this.getImgaeProfileURL();
      } else {
        this.imageProfile = null;
      }
    });
  }

  getUserIncome() {
    this.worklogApiService.getIncomeByUserID(this.id).subscribe((res) => {
      if (res) {
        this.stateService.setFlagUser("N");
      } else {
        this.stateService.setFlagUser("Y");
      }
    });
  }

  getImgaeProfileURL() {
    this.fileService.downloadImageProFile().subscribe((res) => {
      const urlCreator = window.URL;
      this.imageProfile = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(res)
      );
    });
  }

  async logout() {
    sessionStorage.clear();
    await this.keycloakService.logout();
  }
}
