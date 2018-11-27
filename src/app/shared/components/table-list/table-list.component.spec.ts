import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { StatusHighlightDirective } from '../../directives/status-highlight.directive';
import { TableListComponent } from './table-list.component';
import { IncomeFlag } from '../../model/income-flag';
import { Observable, of } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { OrderModule } from 'ngx-order-pipe';

const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
class MockWorklogApiService extends WorklogApiService {
  exportDataCorporate(): Observable<Blob> {
    return of(mockBlob);
  }
  exportDataIndividual(): Observable<Blob> {
    return of(mockBlob);
  }
}


describe('TabelListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;
  let service: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableListComponent, StatusHighlightDirective],
      imports: [FormsModule, CommonModule, RouterTestingModule, NgbModule.forRoot(),
         HttpClientTestingModule, ContentLoaderModule, OrderModule],
      providers: [
        { provide: WorklogApiService, useClass: MockWorklogApiService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    service = TestBed.get(WorklogApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
