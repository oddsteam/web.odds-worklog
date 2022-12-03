import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { WorklogApiService } from '../../core/worklog-api.service';
import { GroupManagementComponent } from './group-management.component';
import { TableListUserBySiteComponent } from './components/table-list-user-by-site/table-list-user-by-site.component';


describe('GroupManagementComponent', () => {
  let component: GroupManagementComponent;
  let fixture: ComponentFixture<GroupManagementComponent>;
  let worklogAPIService: WorklogApiService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GroupManagementComponent, TableListUserBySiteComponent],
      imports: [NgbModule, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupManagementComponent);
    component = fixture.componentInstance;
    worklogAPIService = TestBed.inject(WorklogApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should method getSitesData call service worklogapi method getSitesData & getUserBySiteId', () => {
    const mockSiteData: any[] = [{
      id: '5c0fb860f37e2f8698989cdd',
      name: 'SEC'
    },
    {
      id: '5c0fb875f37e2f8698989cde',
      name: 'SET'
    },
    {
      id: '5c0fb87df37e2f8698989cdf',
      name: 'KTB'
    },
    {
      id: '5c0fb885f37e2f8698989ce0',
      name: 'KBTG'
    },
    {
      id: '5c0fb88af37e2f8698989ce1',
      name: 'DTAC'
    }];
    spyOn(worklogAPIService, 'getSitesData').and.returnValue(of(mockSiteData));
    spyOn(worklogAPIService, 'getUserBySiteId').and.returnValue(of());
    component.getSitesData();
    expect(worklogAPIService.getSitesData).toHaveBeenCalled();
    expect(worklogAPIService.getUserBySiteId).toHaveBeenCalled();
  });

});
