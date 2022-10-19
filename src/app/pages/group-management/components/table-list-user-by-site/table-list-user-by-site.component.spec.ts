import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WorklogApiService } from '../../../../core/worklog-api.service';
import { TableListUserBySiteComponent } from './table-list-user-by-site.component';


describe('TableListUserBySiteComponent', () => {
  let component: TableListUserBySiteComponent;
  let fixture: ComponentFixture<TableListUserBySiteComponent>;
  let worklogAPIService: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableListUserBySiteComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListUserBySiteComponent);
    component = fixture.componentInstance;
    worklogAPIService = TestBed.inject(WorklogApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method getListUserDataSites call service worklogapi getListData &  getSiteName', () => {
    spyOn(worklogAPIService, 'getListData');
    spyOn(worklogAPIService, 'getSiteName');
    component.getListUserDataSites();
    expect(worklogAPIService.getListData).toHaveBeenCalled();
    expect(worklogAPIService.getSiteName).toHaveBeenCalled();
  });
});
