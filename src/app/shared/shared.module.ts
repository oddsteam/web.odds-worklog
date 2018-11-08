import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { StatusHighlightDirective } from './directives/status-highlight.directive';
import { ModalIncomeComponent } from './components/modal-income/modal-income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmIncomeModalComponent } from './components/confirm-income-modal/confirm-income-modal.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    StatusHighlightDirective,
    TabMenuComponent,
    TableListComponent,
    ModalIncomeComponent,
    ConfirmIncomeModalComponent,
  ],
  exports: [
    StatusHighlightDirective,
    TranslateModule,
    NgbModule,
    TabMenuComponent,
    TableListComponent,
    ModalIncomeComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    ConfirmIncomeModalComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
