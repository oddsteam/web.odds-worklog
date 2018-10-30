import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StatusHighlightDirective } from '../shared/directives/status-highlight.directive';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ListIncomeComponent } from './components/list-income/list-income.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { LayoutsComponent } from './layouts.component';
import { LoginService } from './services/login-service/login.service';


describe('LayoutsComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutsComponent, TabMenuComponent, ProfileComponent, AddIncomeComponent, ListIncomeComponent
        , StatusHighlightDirective],
      imports: [FormsModule, CommonModule, RouterTestingModule, HttpClientTestingModule
        , TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })],
      providers: [LoginService],
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
