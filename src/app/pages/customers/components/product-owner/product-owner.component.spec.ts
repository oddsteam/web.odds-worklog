import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductOwnerComponent } from './product-owner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('ProductOwnerComponent', () => {
  let component: ProductOwnerComponent;
  let fixture: ComponentFixture<ProductOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOwnerComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
