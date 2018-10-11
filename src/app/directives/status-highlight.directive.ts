import {
  Directive,
  Input,
  ElementRef,
  Renderer,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
})
export class StatusHighlightDirective implements OnChanges {
  @Input()
  Status: string;
  constructor(private el: ElementRef, private renderer: Renderer) {}
  ngOnChanges() {
    const Status = this.Status;
    if (Status === 'Y') {
      this.renderer.setElementClass(
        this.el.nativeElement,
        'change--positive',
        true
      );
    } else {
      this.renderer.setElementClass(
        this.el.nativeElement,
        'change-negative',
        true
      );
    }
  }
}
