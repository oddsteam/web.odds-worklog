import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component ({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit, OnChanges {
  @Input()
  listSources;
  @Input()
  defaultSelect = '';
  @Output()
  emitSource = new EventEmitter();
  currentSelect;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(change: any) {
    if (
      this.defaultSelect != null &&
      this.defaultSelect.length > 0 &&
      this.listSources != null &&
      this.listSources.length > 0
    ) {
      this.currentSelect = this.listSources.find(
        element => element.id === this.defaultSelect
      );
    }
    this.selectItem(this.currentSelect);
  }

  selectItem(source) {
    if (source != null) {
      this.currentSelect = source;
      this.emitSource.emit(source.id);
    } else {
      if (this.listSources) {
        this.currentSelect = this.listSources[0];
      }
    }
  }
}
