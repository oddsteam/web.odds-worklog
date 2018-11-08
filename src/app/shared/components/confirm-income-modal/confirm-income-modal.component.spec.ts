import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmIncomeModalComponent } from './confirm-income-modal.component';


describe('ConfirmIncomeModalComponent', () => {
    let component: ConfirmIncomeModalComponent;
    let fixture: ComponentFixture<ConfirmIncomeModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmIncomeModalComponent],
            imports: [NgbModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
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

    // it('', () => {
    //     const netIncome = '100';
    //     const vat = '7';
    //     const wht = '3';
    //     expect(component.calNetIncome(netIncome, vat, wht)).toEqual('104');
    // });

    // it('', () => {
    //     const inputNumber = '1000';
    //     expect(component.stringToNumber(inputNumber)).toEqual(1000);
    // });
});
