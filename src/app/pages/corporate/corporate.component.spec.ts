/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListIncomeComponent } from 'src/app/shared/components/list-income/list-income.component';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { AddIncomeCorporateComponent } from './components/add-income-corporate/add-income-corporate.component';
import { CorporateComponent } from './corporate.component';
import { ListCorporateComponent } from './components/list-corporate/list-corporate.component';


describe('CorporateComponent', () => {
  let component: CorporateComponent;
  let fixture: ComponentFixture<CorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateComponent, ListIncomeComponent, TableListComponent
        , StatusHighlightDirective, AddIncomeCorporateComponent, ListCorporateComponent],
      imports: [NgbModule.forRoot(), HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
