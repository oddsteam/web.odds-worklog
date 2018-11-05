import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListCorporateComponent } from './list-corporate.component';


describe('ListCorporateComponent', () => {
  let component: ListCorporateComponent;
  let fixture: ComponentFixture<ListCorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCorporateComponent, TableListComponent, StatusHighlightDirective],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
