/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { of } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeComponent } from 'src/app/shared/components/add-income/add-income.component';
import { ModalIncomeComponent } from 'src/app/shared/components/modal-income/modal-income.component';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListIndividualComponent } from './components/list-individual/list-individual.component';
import { IndividualComponent } from './individual.component';


describe('IndividualComponent', () => {
  let component: IndividualComponent;
  let fixture: ComponentFixture<IndividualComponent>;
  let worklogApiService: WorklogApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualComponent, TableListComponent, StatusHighlightDirective,
        ListIndividualComponent, AddIncomeComponent, ModalIncomeComponent],
      imports: [NgbModule, HttpClientTestingModule, ContentLoaderModule, OrderModule,
        FormsModule, ReactiveFormsModule],
      providers: [WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    worklogApiService = TestBed.get(WorklogApiService);
    fixture = TestBed.createComponent(IndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be personType to equal individual when role is individual', () => {
    const res = {
      role: 'individual'
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(res));

    component.ngOnInit();

    expect(component.personType).toEqual('individual');
    expect(worklogApiService.getUserByID).toHaveBeenCalled();
  });
});
