import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHighlightDirective } from './directives/status-highlight.directive';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { TableListComponent } from './components/table-list/table-list.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [
    StatusHighlightDirective,
    TabMenuComponent,
    TableListComponent

  ],
  exports: [
    StatusHighlightDirective,
    TranslateModule,
    NgbModule,
    TabMenuComponent,
    TableListComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
