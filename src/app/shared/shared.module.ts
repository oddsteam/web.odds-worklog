import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHighlightDirective } from './directives/status-highlight.directive';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ListIncomeComponent } from './components/list-income/list-income.component';
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
    AddIncomeComponent,
    ListIncomeComponent
  ],
  exports: [
    StatusHighlightDirective,
    TranslateModule,
    NgbModule,
    TabMenuComponent,
    TableListComponent,
    AddIncomeComponent,
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
