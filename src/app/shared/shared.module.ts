import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHighlightDirective } from './directives/status-highlight.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StatusHighlightDirective,
  ],
  exports: [
    StatusHighlightDirective,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
 }
