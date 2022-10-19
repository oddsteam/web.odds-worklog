import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';
import { Observable, of } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { StateService } from '../../../core/state.service';
import { StatusHighlightDirective } from '../../directives/status-highlight.directive';
import { TableListComponent } from './table-list.component';
import { User } from '../../model/user';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';

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
  let stateService: StateService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableListComponent, StatusHighlightDirective],
      imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterTestingModule, NgbModule,
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
    stateService = TestBed.get(StateService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch swapArrowIconSort from false to true ', () => {
    expect(component.swapArrowIconSort).toBeFalsy();
    component.setOrder();
    expect(component.swapArrowIconSort).toBeTruthy();
  });

  it('เมื่อเข้ามีการ เรียกใช้ tableList จะมีการเช็คค่าใน ListData หากมีข้อมูลตามที่กำหนดจะทำการ push array เข้า Form', () => {
    const mockUser = new User();
    mockUser.id = '0123456789';
    mockUser.statusTavi = true;
    mockUser.statusTavi = true;
    const mockListIncome = {status: 'N',
    submitDate: '2019-05-01T07:53:30Z',
    user: mockUser,
    workDate: '32',
    workingHours: ''};
    const mockArrayUser = new Array();
    mockArrayUser.push(mockListIncome);
    mockArrayUser.push(mockListIncome);
    mockArrayUser.push(mockListIncome);
    component.ListData = mockArrayUser;
    spyOn(component, 'updateForm');
    spyOn(component, 'getRoleUser');
    component.ngOnInit();
    expect(component.updateForm).toHaveBeenCalled();
    expect(component.getRoleUser).toHaveBeenCalled();
  });
  it('เมื่อเข้ามีการ เรียกใช้ tableList จะมีการเช็คค่าใน ListData หากมีข้อมูลตามที่กำหนดจะทำการ push array เข้า Form', () => {
    const mockUser = new User();
    mockUser.id = '0123456789';
    mockUser.statusTavi = true;
    mockUser.statusTavi = true;
    const mockListIncome = {status: 'N',
    submitDate: '2019-05-01T07:53:30Z',
    user: mockUser,
    workDate: '32',
    workingHours: ''};
    const mockArrayUser = new Array();
    mockArrayUser.push(mockListIncome);
    mockArrayUser.push(mockListIncome);
    mockArrayUser.push(mockListIncome);
    component.ListData = mockArrayUser;
    component.ngOnInit();
    expect(component.tableListForm.get('items').value[0].id).toEqual('0123456789');
    expect(component.tableListForm.get('items').value[1].id).toEqual('0123456789');
  });
});
