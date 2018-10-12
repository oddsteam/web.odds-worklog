import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ProflieComponent } from './layouts/pages/proflie/proflie.component';
import { MyIncomeComponent } from './layouts/pages/my-income/my-income.component';
import { ListIncomeComponent } from './layouts/pages/list-income/list-income.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusHighlightDirective } from './directives/status-highlight.directive';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProflieComponent,
    MyIncomeComponent,
    ListIncomeComponent,
    StatusHighlightDirective
  ],
  imports: [
    BrowserModule, NgbModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
