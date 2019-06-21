import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'odds-worklog';

  subscription: Subscription;

  constructor(router: Router) {
    this.checkBrowserHasRefresh(router);
  }

  private checkBrowserHasRefresh(router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        !router.navigated ? sessionStorage.removeItem("tabActive") : "";
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
