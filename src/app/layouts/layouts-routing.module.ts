import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { CorporateComponent } from '../pages/corporate/corporate.component';
import { IndividualComponent } from '../pages/individual/individual.component';
import { SettingComponent } from '../pages/setting/setting.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutsComponent,
        children: [
            {
                path: 'corporate',
                component: CorporateComponent
            },
            {
                path: 'individual',
                component: IndividualComponent
            },
            {
                path: 'settings',
                component: SettingComponent
            }
        ]
    },
    { path: '', redirectTo: '/corporate', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutsRoutingModule { }
