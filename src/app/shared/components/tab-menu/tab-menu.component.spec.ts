/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TabMenuComponent } from './tab-menu.component';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};
describe('TabMenuComponent', () => {
  let component: TabMenuComponent;
  let fixture: ComponentFixture<TabMenuComponent>;
  let router: Router;
  let worklogApiService: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabMenuComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        WorklogApiService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    worklogApiService = TestBed.get(WorklogApiService);
    fixture = TestBed.createComponent(TabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to correct path /individual', () => {
    component.routerTo('individual');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/individual']);
  });

  it('should be tabActive to equal individual when role to equal individual', () => {
    const res = {
      role: 'individual'
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(res));
    component.ngOnInit();
    expect(component.personType).toEqual('individual');
  });

  it('should be tabActive to equal corporate when role to equal corporate', () => {
    const res = {
      role: 'corporate'
    };
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(res));
    component.ngOnInit();
    expect(component.personType).toEqual('corporate');
  });
});
