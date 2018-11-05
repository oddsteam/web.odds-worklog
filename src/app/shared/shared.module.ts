import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ListIncomeComponent } from './components/list-income/list-income.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { StatusHighlightDirective } from './directives/status-highlight.directive';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [
    StatusHighlightDirective,
    TabMenuComponent,
    TableListComponent,
    ListIncomeComponent
  ],
  exports: [
    StatusHighlightDirective,
    TranslateModule,
    NgbModule,
    TabMenuComponent,
    TableListComponent,
    ListIncomeComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
