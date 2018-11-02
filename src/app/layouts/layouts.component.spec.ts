import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StatusHighlightDirective } from '../shared/directives/status-highlight.directive';
import { LayoutsComponent } from './layouts.component';
import { TabMenuComponent } from '../shared/components/tab-menu/tab-menu.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { WorklogApiService } from '../core/worklog-api.service';


describe('LayoutsComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutsComponent, TabMenuComponent, ProfileComponent,
        , StatusHighlightDirective],
      imports: [FormsModule, CommonModule, RouterTestingModule, HttpClientTestingModule
        , TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })],
      providers: [WorklogApiService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
