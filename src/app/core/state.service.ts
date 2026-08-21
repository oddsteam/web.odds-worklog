import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  isUserType = new BehaviorSubject<string>(null);
  isUserFlag = new BehaviorSubject<string>(null);
  isVatType = new BehaviorSubject<string>(null);
  listIncomeIndividualTrigger = new BehaviorSubject<boolean>(null);
  headerTrigger = new BehaviorSubject<boolean>(null);
  useTimesheetSource = new BehaviorSubject<boolean>(false);

  constructor() { }

  setTypeUser(type: string) {
    this.isUserType.next(type);
  }

  getTypeUser(): Observable<string> {
    return this.isUserType.asObservable();
  }

  setFlagUser(flag: string) {
    this.isUserFlag.next(flag);
  }

  setFlagVat(flag: string) {
    this.isVatType.next(flag);
  }

  triggerListIncomeIndividual() {
    this.listIncomeIndividualTrigger.next(true);
  }

  triggerHeader() {
    this.headerTrigger.next(true);
  }

  setUseTimesheetSource(value: boolean) {
    this.useTimesheetSource.next(value);
  }
}
