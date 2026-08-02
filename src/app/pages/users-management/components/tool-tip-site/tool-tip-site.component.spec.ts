import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { User } from 'src/app/shared/model/user';
import { ToolTipSiteComponent } from './tool-tip-site.component';


describe('ToolTipSiteComponent', () => {
  let component: ToolTipSiteComponent;
  let fixture: ComponentFixture<ToolTipSiteComponent>;
  let worklogApiService: WorklogApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToolTipSiteComponent],
      imports: [NgbModule, HttpClientTestingModule, SharedModule],
      providers: [WorklogApiService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTipSiteComponent);
    component = fixture.componentInstance;
    worklogApiService = TestBed.inject(WorklogApiService);
    component.userId = 'user-1';
    component.currentSiteId = 'site-old';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When an action is made, toggleTooltip function is called ', () => {
    const event = new MouseEvent('click');

    component.toggleTooltip(event);

    expect(component.isShowTooltip).toBeTruthy();
  });

  it('When an action is made, disableTooltip function is called', () => {
    component.isShowTooltip = true;
    const event = new MouseEvent('click');

    component.disableTooltip(event);

    expect(component.isShowTooltip).toBeFalsy();
  });

  it('should not call API when selected site equals currentSiteId', () => {
    spyOn(worklogApiService, 'getUserByID');
    spyOn(worklogApiService, 'updateUser');

    component.onSelectedListSite('site-old');

    expect(worklogApiService.getUserByID).not.toHaveBeenCalled();
    expect(worklogApiService.updateUser).not.toHaveBeenCalled();
  });

  it('should load user and update siteId when a different site is selected', () => {
    const existingUser = new User({
      id: 'user-1',
      role: 'individual',
      vat: 'Y',
      siteId: 'site-old',
      email: 'odds@odds.team',
    });
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(existingUser));
    spyOn(worklogApiService, 'updateUser').and.returnValue(of(existingUser));
    spyOn(component.siteChanged, 'emit');

    component.onSelectedListSite('site-new');

    expect(worklogApiService.getUserByID).toHaveBeenCalledWith('user-1');
    expect(worklogApiService.updateUser).toHaveBeenCalledWith(
      'user-1',
      jasmine.objectContaining({ siteId: 'site-new' })
    );
    expect(component.siteChanged.emit).toHaveBeenCalledWith({
      userId: 'user-1',
      siteId: 'site-new',
    });
    expect(component.isShowTooltip).toBeFalsy();
  });

  it('should alert when updateUser fails', () => {
    const existingUser = new User({
      id: 'user-1',
      role: 'individual',
      vat: 'Y',
      siteId: 'site-old',
    });
    spyOn(worklogApiService, 'getUserByID').and.returnValue(of(existingUser));
    spyOn(worklogApiService, 'updateUser').and.returnValue(
      throwError({ error: { message: 'update failed' } })
    );
    spyOn(window, 'alert');

    component.onSelectedListSite('site-new');

    expect(window.alert).toHaveBeenCalledWith('update failed');
  });
});
