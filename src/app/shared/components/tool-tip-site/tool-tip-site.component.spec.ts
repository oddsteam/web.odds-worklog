import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTipSiteComponent } from './tool-tip-site.component';

describe('ToolTipSiteComponent', () => {
  let component: ToolTipSiteComponent;
  let fixture: ComponentFixture<ToolTipSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolTipSiteComponent ]
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
});
