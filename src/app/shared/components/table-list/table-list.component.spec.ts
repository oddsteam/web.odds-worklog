import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { Observable, of } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { StateService } from '../../../core/state.service';
import { StatusHighlightDirective } from '../../directives/status-highlight.directive';
import { TableListComponent } from './table-list.component';

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
      imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterTestingModule, NgbModule.forRoot(),
        HttpClientTestingModule, ContentLoaderModule, OrderModule],
      providers: [
        { provide: WorklogApiService, useClass: MockWorklogApiService }
        , StateService, BsModalService, ComponentLoaderFactory, PositioningService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    service = TestBed.get(WorklogApiService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch swapArrowIconSort from false to true ', () => {
    expect(component.swapArrowIconSort).toBeTruthy();
    component.setOrder();
    expect(component.swapArrowIconSort).toBeFalsy();
  });
});
