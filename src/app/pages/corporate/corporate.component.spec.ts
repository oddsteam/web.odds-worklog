/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { of } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeComponent } from 'src/app/shared/components/add-income/add-income.component';
import { ModalIncomeComponent } from 'src/app/shared/components/modal-income/modal-income.component';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListCorporateComponent } from './components/list-corporate/list-corporate.component';
import { CorporateComponent } from './corporate.component';


describe('CorporateComponent', () => {
  let component: CorporateComponent;
  let fixture: ComponentFixture<CorporateComponent>;
  let worklogApiService: WorklogApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateComponent, TableListComponent, StatusHighlightDirective, ListCorporateComponent,
        AddIncomeComponent, ModalIncomeComponent],
      imports: [NgbModule.forRoot(), HttpClientTestingModule, OrderModule, ContentLoaderModule,
        FormsModule, ReactiveFormsModule],
      providers: [WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateComponent);
    worklogApiService = TestBed.get(WorklogApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be personType to equal corporate when role is corporate', () => {
    const res = {
      role: 'corporate'
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(res));

    component.ngOnInit();

    expect(component.personType).toEqual('corporate');
    expect(worklogApiService.getUserByID).toHaveBeenCalled();
  });

});
