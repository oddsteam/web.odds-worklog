import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
})
export class StatusHighlightDirective implements OnChanges {
  @Input()
  Status: string;
  constructor(private el: ElementRef) { }
  ngOnChanges() {
    const Status = this.Status;
    if (Status === 'Y') {
      this.el.nativeElement.style.color = 'green';
    } else {
      this.el.nativeElement.style.color = 'red';
    }
  }
}
