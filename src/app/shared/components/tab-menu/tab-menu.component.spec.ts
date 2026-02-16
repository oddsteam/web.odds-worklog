/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TabMenuComponent } from './tab-menu.component';
import { User } from '../../model/user';
import { StateService } from 'src/app/core/state.service';
import { of } from 'rxjs';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};
describe('TabMenuComponent', () => {
  let component: TabMenuComponent;
  let fixture: ComponentFixture<TabMenuComponent>;
  let router: Router;
  let worklogApiService: WorklogApiService;
  let stateService: StateService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TabMenuComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        WorklogApiService,
        StateService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    worklogApiService = TestBed.inject(WorklogApiService);
    stateService = TestBed.inject(StateService);
    fixture = TestBed.createComponent(TabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onInit', () => {
    it('should call get user by id when called', () => {
      spyOn(component, 'getUserById').and.returnValue();

      component.ngOnInit();

      expect(component.getUserById).toHaveBeenCalled();
    });

    it('should call check user type when called', () => {
      spyOn(component, 'checkUserType').and.returnValue();

      component.ngOnInit();

      expect(component.checkUserType).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should get user by id from worklog api service', () => {
      spyOn(worklogApiService, 'getUserByID').and.returnValue(of(new User()));

      component.getUserById();

      expect(worklogApiService.getUserByID).toHaveBeenCalled();
    });

    it('should get user by id from worklog api service with given user id = MOCK_USER_ID', () => {
      spyOn(worklogApiService, 'getUserByID').and.returnValue(of(new User()));
      component.id = 'MOCK_USER_ID';

      component.getUserById();

      expect(worklogApiService.getUserByID).toHaveBeenCalledWith(component.id);
    });

    it('should set person type = MOCK_ROLE when get user by id is successfully', () => {
      spyOn(worklogApiService, 'getUserByID').and.returnValue(of(new User({ role: 'MOCK_ROLE' })));
      const expected = new User();
      expected.role = 'MOCK_ROLE';

      component.getUserById();

      expect(component.personType).toEqual(expected.role);
    });

    it('should call check tab menu when get user by id is successfully', () => {
      spyOn(component, 'checkTabMenu');
      spyOn(worklogApiService, 'getUserByID').and.returnValue(of(new User({ role: 'MOCK_ROLE' })));

      component.getUserById();

      expect(component.checkTabMenu).toHaveBeenCalled();
    });
  });

  describe('checkUserType', () => {
    it('should call is user type when called', () => {
      spyOn(stateService, 'getTypeUser').and.returnValue(of(""));

      component.checkUserType();

      expect(stateService.getTypeUser).toHaveBeenCalled();
    });

    it('should set person type when get type user is exist', () => {
      spyOn(stateService, 'getTypeUser').and.returnValue(of('MOCK_ROLE'));

      component.checkUserType();

      expect(component.personType).toEqual('MOCK_ROLE');
    });

    it('should call check tab menu when get type user is exist', () => {
      spyOn(stateService, 'getTypeUser').and.returnValue(of('MOCK_ROLE'));
      spyOn(component, 'checkTabMenu');

      component.checkUserType();

      expect(component.checkTabMenu).toHaveBeenCalled();
    });
  });

  describe('checkTabMenu', () => {
    let expected;
    beforeEach(() => {
      expected = [
        { id: 'corporate', text: 'CORPORATE', icon: 'fa-building', level: 0 },
        { id: 'individual', text: 'INDIVIDUAL', icon: 'fa-user', level: 0 },
        { id: 'servant', text: 'SERVANT', icon: 'fa-users', level: 0 },
        { id: 'users', text: 'USERS', icon: '', level: 1 },
        { id: 'groups/all', text: 'GROUPS', icon: '', level: 1 },
        { id: 'history', text: 'HISTORY', icon: 'fa-history', level: 0 },
        { id: 'profile', text: 'PROFILE', icon: 'fa-user-circle', level: 0 },
        { id: 'settings', text: 'SETTINGS', icon: 'fa-cog', level: 0 },
      ];
    });

    it('should be tabActive to equal individual when role to equal individual', () => {
      component.personType = 'individual';

      component.checkTabMenu('individual');

      expect(component.listTabMenuShow).toEqual([expected[1], expected[5], expected[6]]);
    });

    it('should be tabActive to equal corporate when role to equal corporate', () => {
      component.personType = 'corporate';

      component.checkTabMenu('corporate');

      expect(component.listTabMenuShow).toEqual([expected[0], expected[5], expected[6]]);
    });

    it('should be tabActive to equal admin when role to equal admin', () => {
      component.personType = 'admin';

      component.checkTabMenu('admin');

      expect(component.listTabMenuShow)
        .toEqual([expected[0], expected[1], expected[2], expected[3], expected[4], expected[6], expected[7]]);
    });
  });

  describe('routerTo', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should go to correct path /individual', () => {
      component.routerTo('individual');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/individual']);
    });

    it('should set isShowLess to false if path = servant', () => {
      component.routerTo('servant');
      expect(component.isShowLess).toBeFalsy();
    });
  });
});
