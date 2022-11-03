import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolTipSiteComponent } from './tool-tip-site.component';


describe('ToolTipSiteComponent', () => {
  let component: ToolTipSiteComponent;
  let fixture: ComponentFixture<ToolTipSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolTipSiteComponent],
      imports: [NgbModule, HttpClientTestingModule, SharedModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTipSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When an action is made, toggleTooltip function is called ', () => {
    const event = <MouseEvent>{
      target: <Object>{
      }
    };

    component.toggleTooltip(event);

    expect(component.clickedElement).toEqual(event.target);
    expect(component.isShowTooltip).toBeTruthy();
  });

  it('When an action is made, disableTooltip function is called', () => {
    component.isShowTooltip = true;
    const event = <MouseEvent>{
      target: <Object>{
      }
    };

    component.disableTooltip(event);

    expect(component.isShowTooltip).toBeFalsy();
  });

  it('When an action is made, onSelectedListSite function is called', () => {
    const site = 'SEC';
    component.onSelectedListSite(site);
    expect(component.site).toEqual(site);
  });
});
