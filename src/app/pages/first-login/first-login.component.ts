import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { FileService } from "src/app/core/file.service";
import { CustomValidators } from "src/app/validators/custom-validators";
import { WorklogApiService } from "../../core/worklog-api.service";
import { Site } from "../../shared/model/site";
import { User } from "../../shared/model/user";
import { MyFile } from "../profile/file";

@Component({
  selector: "app-first-login",
  templateUrl: "./first-login.component.html",
  styleUrls: ["./first-login.component.scss"],
})
export class FirstLoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  siteList: Site[];

  vatList = [
    {
      value: "Y",
      name: "vat",
      isCheck: false,
    },
    {
      value: "N",
      name: "non-vat",
      isCheck: true,
    },
  ];
  roles = [
    {
      value: "individual",
      name: "Individual",
      isCheck: true,
    },
    {
      value: "corporate",
      name: "Corporate",
      isCheck: false,
    },
  ];
  vat = "N";
  isCorporate = false;

  constructor(
    private fb: FormBuilder,
    private worklogService: WorklogApiService,
    private router: Router,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.getListSite();
    this.setupForm();
  }

  setupForm() {
    this.loginForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      corporateName: [""],
      bankAccountName: ["", Validators.required],
      bankAccountNumber: [
        "",
        [Validators.required, Validators.pattern("\\d{9,16}")],
      ],
      slackAccount: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
      vat: [true, Validators.required],
      siteId: ["", Validators.required],
      project: [""],
      idCardFile: [null, Validators.required],
      phone: [null, Validators.required],
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      CustomValidators.validateAllFormFields(this.loginForm);
      return false;
    }
    this.formToModel();
    this.updateUser();
  }

  updateUser() {
    this.worklogService
      .updateUser(sessionStorage.getItem("idUser"), this.user)
      .subscribe(
        (res) => {
          if (res.role === "admin") {
            this.router.navigate(["corporate"]);
          } else {
            this.router.navigate([res.role]);
          }
          this.worklogService
            .sendMailNotificationNewUser()
            .subscribe((res) => {});
        },
        (error) => {
          this.router.navigate(["login"]);
        }
      );
  }

  onCheckBoxVat(vat: string) {
    this.vat = vat;
    this.vatList.map((val) => {
      val.isCheck = vat === val.value;
    });
  }

  getListSite() {
    this.worklogService.getSitesData().subscribe(
      (res) => {
        this.siteList = res;
      },
      (error) => {
        this.router.navigate(["login"]);
      }
    );
  }

  formToModel() {
    this.user = new User();
    this.user.firstName = this.firstNameForm.value;
    this.user.lastName = this.lastNameForm.value;
    this.user.bankAccountName = this.bankAccountNameForm.value;
    this.user.bankAccountNumber = this.bankAccountNumberForm.value;
    this.user.slackAccount = this.slackAccountForm.value;
    this.user.corporateName = this.corporateNameForm.value;
    this.user.role = this.role.value;
    this.user.vat = this.vat;
    this.user.siteId = this.siteIdForm.value;
    this.user.project = this.projectForm.value;
    this.user.phone = this.phone.value;
  }

  get firstNameForm(): FormControl {
    return this.loginForm.get("firstName") as FormControl;
  }

  get lastNameForm(): FormControl {
    return this.loginForm.get("lastName") as FormControl;
  }

  get bankAccountNameForm(): FormControl {
    return this.loginForm.get("bankAccountName") as FormControl;
  }

  get bankAccountNumberForm(): FormControl {
    return this.loginForm.get("bankAccountNumber") as FormControl;
  }

  get slackAccountForm(): FormControl {
    return this.loginForm.get("slackAccount") as FormControl;
  }

  get corporateNameForm(): FormControl {
    return this.loginForm.get("corporateName") as FormControl;
  }
  get role(): FormControl {
    return this.loginForm.get("role") as FormControl;
  }

  get siteIdForm(): FormControl {
    return this.loginForm.get("siteId") as FormControl;
  }

  get projectForm(): FormControl {
    return this.loginForm.get("project") as FormControl;
  }

  get phone(): FormControl {
    return this.loginForm.get("phone") as FormControl;
  }

  get bankAccountPlaceholder(): string {
    return "ต้องเป็นบัญชีกรุงไทยเท่านั้นนะ";
  }
  get idCardFile(): FormControl {
    return this.loginForm.get("idCardFile") as FormControl;
  }

  onChangeIdCardFile(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        this.idCardFile.setValue(file.name);
        this.onSubmit(file, "idcard");
      } else {
        alert("กรุณาอัพโหลดไฟล์นามสกุล PDF เท่านั้น");
      }
    }
  }

  onSubmit(file, type) {
    this.fileService.uploadIdCard(file).subscribe(
      (response) => {
        const message = response["message"];
        alert(message);
        if (message) {
        }
      },
      (err) => alert("Upload id card failed.")
    );
  }

  onRemove(type) {
    this.fileService.removeIdCard().subscribe(
      (response) => {
        alert(response["message"]);
        this.idCardFile.setValue(null);
      },
      (err) => alert("Remove id card failed.")
    );
  }
}
