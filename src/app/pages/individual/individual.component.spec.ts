/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListIndividualComponent } from './components/list-individual/list-individual.component';
import { IndividualComponent } from './individual.component';
import { OrderModule } from 'ngx-order-pipe';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { AddIncomeComponent } from 'src/app/shared/components/add-income/add-income.component';
import { ModalIncomeComponent } from 'src/app/shared/components/modal-income/modal-income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('IndividualComponent', () => {
  let component: IndividualComponent;
  let fixture: ComponentFixture<IndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualComponent, TableListComponent, StatusHighlightDirective,
        ListIndividualComponent, AddIncomeComponent, ModalIncomeComponent],
      imports: [NgbModule.forRoot(), HttpClientTestingModule, ContentLoaderModule, OrderModule,
      FormsModule, ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
