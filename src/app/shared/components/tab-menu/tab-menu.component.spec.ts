/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TabMenuComponent } from './tab-menu.component';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};
describe('TabMenuComponent', () => {
  let component: TabMenuComponent;
  let fixture: ComponentFixture<TabMenuComponent>;
  let router: Router;
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
});
