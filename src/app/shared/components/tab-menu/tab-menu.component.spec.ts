/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TabMenuComponent } from './tab-menu.component';
import { Router } from '@angular/router';

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
      imports: [RouterTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
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
