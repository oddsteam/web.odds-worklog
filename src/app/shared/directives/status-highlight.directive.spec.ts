import { By } from '@angular/platform-browser';
import { Input, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusHighlightDirective } from './status-highlight.directive';

@Component({
  template: '<div id="test-directive" appStatusHighlight [Status]="listData"></div>'
})
class TestInputCurrencyComponent {
  @Input() listData;
}


describe('Directive In Event Input Component', () => {
  let component: TestInputCurrencyComponent;
  let fixture: ComponentFixture<TestInputCurrencyComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestInputCurrencyComponent, StatusHighlightDirective]
    });
    fixture = TestBed.createComponent(TestInputCurrencyComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('div'));
  });

  it('when status = Y element should have class change--positive', () => {
    component.listData = 'Y';
    fixture.detectChanges();
    expect(inputElement.nativeElement.className).toEqual('change--positive');
  });

  it('when status = N element should have class change-negative', () => {
    component.listData = 'N';
    fixture.detectChanges();
    expect(inputElement.nativeElement.className).toEqual('change-negative');
  });

});
