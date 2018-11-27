import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceConfig } from 'angular-6-social-login';
import { getAuthServiceConfigs } from '../../app.module';
import { WorklogApiService } from '../../core/worklog-api.service';
import { LoginGoogleComponent } from './login-google.component';


class MockRouterService {
  navigate() { }
}
const mockRouterService = new MockRouterService();

describe('LoginGoogleComponent', () => {
  let component: LoginGoogleComponent;
  let fixture: ComponentFixture<LoginGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginGoogleComponent],
      imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, {
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
      },
        {
          provide: Router,
          useValue: mockRouterService,
        },
        WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
