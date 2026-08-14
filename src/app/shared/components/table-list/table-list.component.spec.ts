import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { Site } from '../../model/site';

const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
const mockSites: Site[] = [
  { id: 'site-1', name: 'ODDS' },
  { id: 'site-2', name: 'KTB' },
];

class MockWorklogApiService extends WorklogApiService {
  exportDataIndividual(): Observable<Blob> {
    return of(mockBlob);
  }
  getSitesData(): Observable<Site[]> {
    return of(mockSites);
  }
}


describe('TabelListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;
  let service: WorklogApiService;
  let stateService: StateService;
  beforeEach(waitForAsync(() => {
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
    service = TestBed.inject(WorklogApiService);
    stateService = TestBed.inject(StateService);
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
    spyOn(component, 'loadSites');
    component.ngOnInit();
    expect(component.updateForm).toHaveBeenCalled();
    expect(component.getRoleUser).toHaveBeenCalled();
    expect(component.loadSites).toHaveBeenCalled();
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

  describe('getSiteName', () => {
    beforeEach(() => {
      component.loadSites();
    });

    it('should resolve site name from siteId', () => {
      const user = new User({ siteId: 'site-1' });
      expect(component.getSiteName(user)).toEqual('ODDS');
    });

    it('should return dash when siteId is missing', () => {
      const user = new User();
      expect(component.getSiteName(user)).toEqual('-');
    });

    it('should return dash when siteId is unknown', () => {
      const user = new User({ siteId: 'missing-site' });
      expect(component.getSiteName(user)).toEqual('-');
    });
  });
});
