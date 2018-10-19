import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
})
export class StatusHighlightDirective implements OnChanges {
  @Input()
  Status: string;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnChanges() {
    const Status = this.Status;
    if (Status === 'Y') {
      this.renderer.addClass(this.el.nativeElement, 'change--positive');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'change-negative');
    }
  }
}
