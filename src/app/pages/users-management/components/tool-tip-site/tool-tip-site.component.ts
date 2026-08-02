import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
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
  clickedElement = null;
  private saving = false;

  constructor(private worklogApiService: WorklogApiService) { }

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
