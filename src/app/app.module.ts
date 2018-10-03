import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ProflieComponent } from './layouts/pages/proflie/proflie.component';
import { MyIncomeComponent } from './layouts/pages/my-income/my-income.component';
import { ListIncomeComponent } from './layouts/pages/list-income/list-income.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProflieComponent,
    MyIncomeComponent,
    ListIncomeComponent
  ],
  imports: [
    BrowserModule, NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
