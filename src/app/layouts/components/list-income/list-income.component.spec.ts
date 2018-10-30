import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { IncomeService } from '../../services/income.service';
import { ListIncomeComponent } from './list-income.component';


describe('ListIncomeComponent', () => {
  let component: ListIncomeComponent;
  let fixture: ComponentFixture<ListIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListIncomeComponent, StatusHighlightDirective],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [IncomeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
