import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmIncomeModalComponent } from './confirm-income-modal.component';

describe('ConfirmIncomeModalComponent', () => {
    let component: ConfirmIncomeModalComponent;
    let fixture: ComponentFixture<ConfirmIncomeModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmIncomeModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmIncomeModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
