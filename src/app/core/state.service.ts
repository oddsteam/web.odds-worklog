import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  isUserType = new BehaviorSubject<string>(null);
  isUserFlag = new BehaviorSubject<string>(null);
  isVatType = new BehaviorSubject<string>(null);
  listIncomeCorporateTrigger = new BehaviorSubject<boolean>(null);
  listIncomeIndividualTrigger = new BehaviorSubject<boolean>(null);

  constructor() { }

  setTypeUser(type: string) {
    this.isUserType.next(type);
  }

  setFlagUser(flag: string) {
    this.isUserFlag.next(flag);
  }

  setFlagVat(flag: string) {
    this.isVatType.next(flag);
  }

  triggerListIncomeCorporate() {
    this.listIncomeCorporateTrigger.next(true);
  }

  triggerListIncomeIndividual() {
    this.listIncomeIndividualTrigger.next(true);
  }
}
