import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-tool-tip-site',
  templateUrl: './tool-tip-site.component.html',
  styleUrls: ['./tool-tip-site.component.scss']
})
export class ToolTipSiteComponent implements OnInit {
  @Input()
  userId;
  site: string;
  isShowTooltip = false;
  clickedElement = null;
  dataListSite = [
    { key: 'Default', value: 'No Site' },
    { key: 'KTB', value: 'KTB' },
    { key: 'SET', value: 'SET' },
    { key: 'DTAC', value: 'DTAC' },
    { key: 'SEC', value: 'SEC' },
    { key: 'AIS', value: 'AIS' },
    { key: 'KBTG', value: 'KBTG' },
  ];
  constructor() { }

  ngOnInit() {
  }

  toggleTooltip() {
    this.clickedElement = event.target;
    this.isShowTooltip = true;
  }
  @HostListener('document:click', ['$event'])
  disableTooltip(event) {
    if (this.clickedElement !== event.target) {
      this.isShowTooltip = false;
    }
  }
  onSelectedListSite(site) {
     this.site = site;
  }
}
