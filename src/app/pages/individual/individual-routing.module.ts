import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualComponent } from './individual.component';

const routes: Routes = [
    {
        path: '',
        component: IndividualComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class IndividualRoutingModule { }
