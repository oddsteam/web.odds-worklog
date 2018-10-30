import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmIncomeModalComponent } from './confirm-income-modal.component';
import { IncomeService } from 'src/app/layouts/services/income.service';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing'

describe('ConfirmIncomeModalComponent', () => {
    let component: ConfirmIncomeModalComponent;
    let fixture: ComponentFixture<ConfirmIncomeModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmIncomeModalComponent],
            imports:[NgbModule.forRoot(),HttpClientTestingModule],
            providers:[IncomeService,
            NgbActiveModal]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmIncomeModalComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('',() => {
        const netIncome = '100';
        const vat = '7';
        const wht = '3';
        expect(component.calTotal(netIncome,vat,wht)).toEqual('10000');
    });

    fit('',() => {
         const inputNumber = '1000';
         expect(component.stringToNumber(inputNumber)).toEqual(1000);
    });
});