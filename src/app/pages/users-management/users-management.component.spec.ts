import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementComponent } from './users-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

describe('UsersManagementComponent', () => {
  let component: UsersManagementComponent;
  let fixture: ComponentFixture<UsersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersManagementComponent],
      imports: [NgbModule.forRoot(), HttpClientTestingModule],
      providers: [WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
