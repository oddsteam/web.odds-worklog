import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddIncomeModalComponent } from './add-income-modal.component';


describe('AddIncomeModalComponent', () => {
    let component: AddIncomeModalComponent;
    let fixture: ComponentFixture<AddIncomeModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddIncomeModalComponent],
            imports: [FormsModule],
            providers: [NgbActiveModal]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddIncomeModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
