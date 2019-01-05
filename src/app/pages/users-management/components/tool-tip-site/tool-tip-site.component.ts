import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-tool-tip-site',
  templateUrl: './tool-tip-site.component.html',
  styleUrls: ['./tool-tip-site.component.scss']
})
export class ToolTipSiteComponent implements OnInit {
  @Input() listSources;
  @Input() userId;
  site: string;
  isShowTooltip = false;
  clickedElement = null;
  constructor() { }

  ngOnInit() {
  }

  toggleTooltip(event) {
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
