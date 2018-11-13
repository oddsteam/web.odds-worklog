/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListIndividualComponent } from './list-individual.component';
import { DataTablesModule } from 'angular-datatables';


describe('ListIndividualComponent', () => {
  let component: ListIndividualComponent;
  let fixture: ComponentFixture<ListIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListIndividualComponent, TableListComponent, StatusHighlightDirective],
      imports: [HttpClientTestingModule, DataTablesModule.forRoot()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
