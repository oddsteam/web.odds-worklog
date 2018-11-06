import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { StatusHighlightDirective } from '../../directives/status-highlight.directive';
import { TableListComponent } from '../table-list/table-list.component';
import { ListIncomeComponent } from './list-income.component';
import { IncomeFlag } from '../../model/income-flag';


describe('ListIncomeComponent', () => {
  let component: ListIncomeComponent;
  let fixture: ComponentFixture<ListIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListIncomeComponent, StatusHighlightDirective, TableListComponent],
      imports: [NgbModule.forRoot(), HttpClientTestingModule],
      providers: [WorklogApiService]
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

  it('should call getIncomeCorporate if typeGetListService = corporate', () => {
    IncomeFlag.typeGetListService = 'corporate';
    spyOn(component, 'getIncomeCorporate');
    component.ngOnInit();
    expect(component.getIncomeCorporate).toHaveBeenCalled();
  });

  it('should call getIncomeIndividual if typeGetListService = individual', () => {
    IncomeFlag.typeGetListService = 'individual';
    spyOn(component, 'getIncomeIndividual');
    component.ngOnInit();
    expect(component.getIncomeIndividual).toHaveBeenCalled();
  });
});
