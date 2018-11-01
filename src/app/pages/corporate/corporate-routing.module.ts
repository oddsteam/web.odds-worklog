import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateComponent } from './corporate.component';

const routes: Routes = [
    {
        path: '',
        component: CorporateComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class CorporateRoutingModule { }
