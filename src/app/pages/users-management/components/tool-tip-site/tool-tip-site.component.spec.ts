import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTipSiteComponent } from './tool-tip-site.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ToolTipSiteComponent', () => {
  let component: ToolTipSiteComponent;
  let fixture: ComponentFixture<ToolTipSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolTipSiteComponent ],
      imports: [NgbModule.forRoot(), HttpClientTestingModule, SharedModule],
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
