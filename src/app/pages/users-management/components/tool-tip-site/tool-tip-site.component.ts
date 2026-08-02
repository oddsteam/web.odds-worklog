import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-tool-tip-site',
  templateUrl: './tool-tip-site.component.html',
  styleUrls: ['./tool-tip-site.component.scss']
})
export class ToolTipSiteComponent implements OnInit {
  @Input() listSources;
  @Input() userId;
  @Input() currentSiteId = '';
  @Output() siteChanged = new EventEmitter<{ userId: string; siteId: string }>();
  site: string;
  isShowTooltip = false;
  private saving = false;

  constructor(
    private worklogApiService: WorklogApiService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  toggleTooltip(event: MouseEvent) {
    event.stopPropagation();
    this.isShowTooltip = !this.isShowTooltip;
  }

  @HostListener('document:click', ['$event'])
  disableTooltip(event: MouseEvent) {
    if (!this.isShowTooltip) {
      return;
    }
    const target = event.target as Node;
    // Keep open when interacting with the tooltip or bootstrap dropdown menu (often outside host).
    if (this.elementRef.nativeElement.contains(target)) {
      return;
    }
    if (target instanceof Element && target.closest('.dropdown-menu')) {
      return;
    }
    this.isShowTooltip = false;
  }

  onSelectedListSite(siteId: string) {
    if (!siteId || !this.userId || siteId === this.currentSiteId || this.saving) {
      return;
    }
    this.site = siteId;
    this.saving = true;
    this.worklogApiService.getUserByID(this.userId).subscribe(
      user => {
        if (user.siteId === siteId) {
          this.saving = false;
          this.isShowTooltip = false;
          return;
        }
        user.siteId = siteId;
        this.worklogApiService.updateUser(this.userId, user).subscribe(
          () => {
            this.saving = false;
            this.isShowTooltip = false;
            this.currentSiteId = siteId;
            this.siteChanged.emit({ userId: this.userId, siteId });
          },
          err => {
            this.saving = false;
            alert(err.error && err.error.message ? err.error.message : 'Failed to update site');
          }
        );
      },
      err => {
        this.saving = false;
        alert(err.error && err.error.message ? err.error.message : 'Failed to load user');
      }
    );
  }
}
