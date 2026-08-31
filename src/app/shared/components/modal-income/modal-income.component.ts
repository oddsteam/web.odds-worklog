import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { StateService } from "src/app/core/state.service";
import { WorklogApiService } from "src/app/core/worklog-api.service";
import { AddIncomeResponse } from "../../model/add-income-model-response";
import { IncomeFlag } from "../../model/income-flag";

@Component({
  selector: "app-modal-income",
  templateUrl: "./modal-income.component.html",
  styleUrls: ["./modal-income.component.scss"],
})
export class ModalIncomeComponent implements OnInit {
  @Output() closeModalEmit = new EventEmitter();
  @Output() addIncomeEmit = new EventEmitter();
  @Input() openModal;
  @Input() typeUser;
  @Input() addIncomeData: AddIncomeResponse;
  @Input() typeVat;
  title: string;
  numberFormat: string;
  flagChange: Boolean = false;
  fg: FormGroup;
  role: string;
  addIncomeAlready: Boolean = false;
  dailyIncome: string;
  totalIncome: string;
  vatPrimary: string;
  vatSpecial: string;
  whtPrimary: string;
  whtSpecial: string;
  constructor(
    private fb: FormBuilder,
    private worklogApiService: WorklogApiService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.getDailyIncome();
    this.onSetupForm();
    this.title = "Add Income";
    this.role = sessionStorage.getItem("role");
  }

  isVat(): boolean {
    return this.typeVat === "Y" ? true : false;
  }

  getDailyIncome() {
    this.dailyIncome = this.worklogApiService.getDailyIncome();
  }

  onSetupForm() {
    if (this.addIncomeData === null) {
      this.addIncomeData = {
        id: "",
        userId: "",
        submitDate: "",
        note: "",
        vat: "",
        wht: "",
        workDate: "",
        netIncome: "",
        netDailyIncome: "",
        workingHours: "",
        specialIncome: "",
        netSpecialIncome: "",
        totalIncome: "",
      };
      this.fg = this.fb.group({
        note: ["", Validators.required],
        workDate: ["", Validators.required],
        workingHours: ["", Validators.required],
        specialIncome: ["", Validators.required],
      });
    } else {
      this.fg = this.fb.group({
        note: [this.addIncomeData.note, Validators.required],
        workDate: [this.addIncomeData.workDate, Validators.required],
        workingHours: [this.addIncomeData.workingHours, Validators.required],
        specialIncome: [this.addIncomeData.specialIncome, Validators.required],
      });
      this.inputIncomeAmount();
      this.inputWorkingHours();
      this.inputWorkDate();
    }
  }

  calTotalIncome() {
    // tslint:disable-next-line:no-unused-expression
    this.dailyIncome
      ? ""
      : alert("รบกวนใส่ รายได้ต่อวัน ที่หน้า Profile ก่อนนะ");
    const dailyIncome = this.dailyIncome ? stringToNumber(this.dailyIncome) : 1;
    const workDate = this.workDate.value
      ? stringToNumber(this.workDate.value)
      : 0;
    const specialIncome = this.specialIncome.value
      ? stringToNumber(this.specialIncome.value)
      : 1;
    const workingHours = this.workingHours.value
      ? stringToNumber(this.workingHours.value)
      : 0;
    const netDailyIncome = dailyIncome * workDate;
    const netSpecialIncome = specialIncome * workingHours;
    this.totalIncome = String(netDailyIncome + netSpecialIncome);
    this.addIncomeData.netDailyIncome = String(netDailyIncome);
    this.addIncomeData.netSpecialIncome = String(netSpecialIncome);
    this.addIncomeData.netIncome = String(netDailyIncome + netSpecialIncome);
  }

  calTax() {
    this.vatPrimary = calVAT(this.addIncomeData.netDailyIncome);
    this.vatSpecial = calVAT(this.addIncomeData.netSpecialIncome);
    this.whtPrimary = calWHT(this.addIncomeData.netDailyIncome);
    this.whtSpecial = calWHT(this.addIncomeData.netSpecialIncome);
  }

  onSubmit() {
    this.calTotalIncome();
    this.calTax();
    this.title = "Confirm Income";
    this.addIncomeData.totalIncome = this.totalIncome;
    this.addIncomeAlready = true;
    this.updateData();
  }

  onConfirm() {
    if (IncomeFlag.isUpdate) {
      this.updateIncomeService(cutComma(this.specialIncome.value));
    } else {
      this.addIncomeConfirm(cutComma(this.specialIncome.value));
    }
    this.closeModalEmit.emit(true);
    this.addIncomeEmit.emit(true);
  }

  updateData() {
    this.specialIncome.setValue(
      this.specialIncome.value === "" ? "0" : this.specialIncome.value
    );
    this.addIncomeData.vat = calVAT(this.addIncomeData.totalIncome);
    this.addIncomeData.wht = calWHT(this.addIncomeData.totalIncome);
    this.addIncomeData.totalIncome = calNetIncome(
      this.addIncomeData.totalIncome,
      this.typeVat === "Y" ? this.addIncomeData.vat : "0",
      this.addIncomeData.wht
    );
  }

  addIncomeConfirm(specialIncome) {
    this.worklogApiService
      .addIncomeConfirm(this.getIncome(specialIncome))
      .subscribe({
        next: (_) => {
          IncomeFlag.isUpdate = true;
          this.handleSaveIncomeSuccess();
        },
        error: this.handleError,
      });
  }

  updateIncomeService(specialIncome) {
    this.worklogApiService
      .updateIncomeService(this.getIncome(specialIncome))
      .subscribe({
        next: (_) => this.handleSaveIncomeSuccess(),
        error: this.handleError,
      });
  }

  getIncome(specialIncome) {
    this.fg.patchValue({
      specialIncome: specialIncome,
    });
    const addIncome = this.fg.value;
    return addIncome;
  }

  handleSaveIncomeSuccess() {
    this.stateService.triggerListIncomeIndividual();
    this.closeModalEmit.emit(true);
  }

  handleError(err) {
    alert(err.message);
  }

  disableButton(): boolean {
    const totalIncome = Number(this.totalIncome);
    if (totalIncome < 1) {
      return true;
    }
    return false;
  }

  inputIncomeAmount() {
    const specialIncome = this.specialIncome.value;
    this.flagChange = true;
    const realFormat = this.formatAmount(specialIncome);
    this.fg.get("specialIncome").setValue(realFormat);
  }

  inputWorkingHours() {
    this.flagChange = true;
    const workingHours = this.workingHours.value;
    const stringFormat = this.formatInteger(workingHours);
    this.fg.get("workingHours").setValue(stringFormat);
  }
  
  inputWorkDate() {
    this.flagChange = true;
    const workDate = this.workDate.value;
    const stringFormat = this.formatDecimal(workDate);
    this.fg.get("workDate").setValue(stringFormat);
  }

  formatInteger(data: string): string {
    if (!data) {
      return "";
    }

    return data.replace(/,/g, "").replace(/[^0-9]/g, "");
  }

  formatAmount(input: string): string {
    if (!input) {
      return "";
    }

    const sanitizedInput = this.sanitizeDecimalInput(input);
    return this.maskTextInput_BalanceNumber(sanitizedInput);
  }

  formatDecimal(input: string): string {
    if (!input) {
      return "";
    }

    const sanitizedInput = this.sanitizeDecimalInput(input);
    const hasDecimalPoint =
      sanitizedInput.endsWith(".") || this.checkTextHaveDigit(sanitizedInput);

    if (!hasDecimalPoint) {
      return this.normalizeIntegerPart(sanitizedInput);
    }

    const array = sanitizedInput.split(".");
    const integerPart = this.normalizeIntegerPart(array[0], true);
    const decimalPart = (array[1] || "").substring(0, 2);

    if (sanitizedInput.endsWith(".") && decimalPart.length === 0) {
      return `${integerPart}.`;
    }

    return decimalPart.length > 0
      ? `${integerPart}.${decimalPart}`
      : integerPart;
  }

  maskTextInput_BalanceNumber(input: string) {
    const hasDecimalPoint = input.endsWith(".") || this.checkTextHaveDigit(input);

    if (hasDecimalPoint) {
      const array = input.split(".");
      const integerPart = this.normalizeIntegerPart(array[0], true);
      const decimalPart = (array[1] || "").substring(0, 2);
      const formattedIntegerPart = this.formatInt(integerPart);

      if (input.endsWith(".") && decimalPart.length === 0) {
        return `${formattedIntegerPart}.`;
      }

      return decimalPart.length > 0
        ? `${formattedIntegerPart}.${decimalPart}`
        : formattedIntegerPart;
    }

    return this.formatInt(this.normalizeIntegerPart(input));
  }

  formatInt(Result: string): string {
    Result = Result.substring(0, 9);
    Result = Result.replace(/^(\d+)(\d{3})/, "$1,$2");
    Result = Result.replace(/^(\d+)(\d{3})/, "$1,$2");
    Result = Result.replace(/^(\d+)(\d{3})/, "$1,$2");
    return Result;
  }

  checkTextHaveDigit(testText: string) {
    return /\./.test(testText);
  }

  checkFirstValueIsZero(Text: string) {
    if (/(^(0+|,|\.)[0-9,])/.test(Text)) {
      Text = Text.split(",").join("");
      Text = String(Number(Text));
    }
    return Text;
  }

  sanitizeDecimalInput(input: string): string {
    const rawValue = input.replace(/,/g, "").replace(/[^0-9.]/g, "");
    const segments = rawValue.split(".");
    const integerPart = segments.shift() || "";
    const decimalPart = segments.join("").substring(0, 2);

    if (rawValue.endsWith(".") && decimalPart.length === 0) {
      return `${integerPart}.`;
    }

    return rawValue.includes(".")
      ? `${integerPart}.${decimalPart}`
      : integerPart;
  }

  normalizeIntegerPart(value: string, allowZeroWhenEmpty = false): string {
    const digits = (value || "").replace(/[^0-9]/g, "");

    if (digits === "") {
      return allowZeroWhenEmpty ? "0" : "";
    }

    return digits.replace(/^0+(?=\d)/, "");
  }

  onCancel() {
    this.addIncomeAlready = false;
    this.title = "Add Income";
  }

  closeModal() {
    this.closeModalEmit.emit(true);
  }
  get workDate(): AbstractControl {
    return this.fg.get("workDate");
  }

  get specialIncome(): AbstractControl {
    return this.fg.get("specialIncome");
  }

  get workingHours(): AbstractControl {
    return this.fg.get("workingHours");
  }
}

export function calVAT(netIncome: string): string {
  return (stringToNumber(netIncome) * 0.07).toString();
}

export function calWHT(netIncome: string): string {
  return (stringToNumber(netIncome) * 0.05).toString();
}

export function calNetIncome(
  totalIncome: string,
  vat: string,
  wht: string
): string {
  return (
    stringToNumber(totalIncome) +
    stringToNumber(vat) -
    stringToNumber(wht)
  ).toString();
}

export function stringToNumber(text: string): number {
  return Number(cutComma(text));
}

export function cutComma(text: string): string {
  return text.replace(/,/g, "");
}
