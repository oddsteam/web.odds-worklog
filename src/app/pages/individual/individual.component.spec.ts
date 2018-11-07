/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListIncomeComponent } from 'src/app/shared/components/list-income/list-income.component';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { AddIncomeIndividualComponent } from './components/add-income-individual/add-income-individual.component';
import { ListIndividualComponent } from './components/list-individual/list-individual.component';
import { IndividualComponent } from './individual.component';


describe('IndividualComponent', () => {
  let component: IndividualComponent;
  let fixture: ComponentFixture<IndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualComponent, ListIncomeComponent, TableListComponent, StatusHighlightDirective,
        AddIncomeIndividualComponent, ListIndividualComponent],
      imports: [NgbModule.forRoot(), HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
