import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomersProfileComponent } from './customers-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageTooltipComponent } from 'src/app/shared/components/message-tooltip/message-tooltip.component';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';


describe('CustomersProfileComponent', () => {
  let component: CustomersProfileComponent;
  let fixture: ComponentFixture<CustomersProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersProfileComponent, MessageTooltipComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
