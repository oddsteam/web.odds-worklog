import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHighlightDirective } from './directives/status-highlight.directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, TranslateModule
  ],
  declarations: [
    StatusHighlightDirective,
  ],
  exports: [
    StatusHighlightDirective,
    TranslateModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
 }
