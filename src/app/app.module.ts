import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './layouts/pages/profile/profile.component';
import { ListIncomeComponent } from './layouts/pages/list-income/list-income.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusHighlightDirective } from './directives/status-highlight.directive';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layouts/component/header/header.component';
import { MenuComponent } from './layouts/component/menu/menu.component';
import { AddIncomeComponent } from './layouts/component/add-income/add-income.component';
import { AddIncomeModalComponent } from './layouts/modal/add-income-modal/add-income-modal.component';
import { ConfirmIncomeModalComponent } from './layouts/modal/confirm-income-modal/confirm-income-modal.component';
import { Routes, RouterModule } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: '', redirectTo: '/listofincome', pathMatch: 'full' },
  { path: 'listofincome', component: ListIncomeComponent },
  // { path: 'dashboard', component: DashboardComponent},
  // { path: 'admin', component: adminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    ListIncomeComponent,
    StatusHighlightDirective,
    MenuComponent,
    AddIncomeComponent,
    AddIncomeModalComponent,
    ConfirmIncomeModalComponent
  ],
  entryComponents: [
    AddIncomeModalComponent,
    ConfirmIncomeModalComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule, NgbModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
