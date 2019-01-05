import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutsComponent,
        children: [
            {
                path: 'profile',
                loadChildren:
                '../pages/profile/profile.module#ProfileModule',
            },
            {
                path: 'corporate',
                loadChildren:
                '../pages/corporate/corporate.module#CorporateModule',
            },
            {
                path: 'individual',
                loadChildren:
                '../pages/individual/individual.module#IndividualModule',
            },
            {
                path: 'settings',
                loadChildren:
                '../pages/setting/setting.module#SettingModule',
            },
            {
                path: 'users',
                loadChildren:
                '../pages/users-management/users-management.module#UsersManagementModule',
            },
            {
                path: 'groups',
                loadChildren:
                '../pages/group-management/group-management.module#GroupManagementModule',
            },
            {
                path: 'customers',
                loadChildren:
                '../pages/customers/customers.module#CustomersModule',
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
