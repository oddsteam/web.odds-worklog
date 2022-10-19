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
import { DataTablesModule } from 'angular-datatables';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { OrderModule } from 'ngx-order-pipe';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { RouterModule } from '@angular/router';
import { MessageTooltipComponent } from './components/message-tooltip/message-tooltip.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ContentLoaderModule,
    OrderModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DataTablesModule.forRoot()
  ],
  declarations: [
    StatusHighlightDirective,
    TabMenuComponent,
    TableListComponent,
    ModalIncomeComponent,
    AddIncomeComponent,
    DropDownComponent,
    MessageTooltipComponent,
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
    DataTablesModule,
    AddIncomeComponent,
    BsDropdownModule,
    DropDownComponent,
    MessageTooltipComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
