import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHighlightDirective } from './directives/status-highlight.directive';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule, TranslateModule, NgbModule
  ],
  declarations: [
    StatusHighlightDirective,
  ],
  exports: [
    StatusHighlightDirective,
    TranslateModule,
    NgbModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
 }
