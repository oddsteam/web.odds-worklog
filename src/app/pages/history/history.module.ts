import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';

@NgModule({
    imports: [
        CommonModule, SharedModule, HistoryRoutingModule
    ],
    declarations: [HistoryComponent]
})
export class HistoryModule { }

