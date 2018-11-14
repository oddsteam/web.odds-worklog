import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { WorklogApiService } from '../../../core/worklog-api.service';
import { ConfirmIncomeModalComponent } from './confirm-income-modal.component';


describe('ConfirmIncomeModalComponent', () => {
    let component: ConfirmIncomeModalComponent;
    let fixture: ComponentFixture<ConfirmIncomeModalComponent>;
    let netIncome: string;
    let worklogApiService: WorklogApiService;
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
        worklogApiService = TestBed.get(WorklogApiService);
        component = fixture.componentInstance;
        netIncome = '100';
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call calNetIncome test netIncome is 100 & vat is 7 & wht is 3 return  104', () => {
        const vat = '7';
        const wht = '3';
        expect(component.calNetIncome(netIncome, vat, wht)).toEqual('104');
    });

    it('should call stringToNumber is input "1000" return number 1000', () => {
        const inputNumber = '1000';
        expect(component.stringToNumber(inputNumber)).toEqual(1000);
    });

    it('should call calVAT netIncome is 100 return 7.000000000000001', () => {
        expect(component.calVAT(netIncome)).toEqual('7.000000000000001');
    });

    it('should call calWHT netIncome is 100 return 3', () => {
        expect(component.calWHT(netIncome)).toEqual('3');
    });

    it('should call method updateIncomeService to Have Been Called worklogApiService updateIncomeService', () => {
        spyOn(worklogApiService, 'updateIncomeService').and.returnValue(of());
        component.updateIncomeService();
        expect(worklogApiService.updateIncomeService).toHaveBeenCalled();
    });

    it('should call method addIncomeConfirm to Have Been Called worklogApiService addIncomeConfirm', () => {
        spyOn(worklogApiService, 'addIncomeConfirm').and.returnValue(of());
        component.addIncomeConfirm();
        expect(worklogApiService.addIncomeConfirm).toHaveBeenCalled();
    });

    it('should call method updateData  is call method calVAT & calWHT & calNetIncome', () => {
        spyOn(component, 'calVAT');
        spyOn(component, 'calWHT');
        spyOn(component, 'calNetIncome');
        component.updateData();
        expect(component.calVAT).toHaveBeenCalled();
        expect(component.calWHT).toHaveBeenCalled();
        expect(component.calNetIncome).toHaveBeenCalled();

    });
});
