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
                () => import('../pages/profile/profile-routing.module').then(m => m.ProfileRoutingModule),
            },
            {
                path: 'individual',
                loadChildren:
                () => import('../pages/individual/individual.module').then(m => m.IndividualModule),
            },
            {
                path: 'users',
                loadChildren:
                () => import('../pages/users-management/users-management.module').then(m => m.UsersManagementModule),
            },
            {
                path: 'groups',
                loadChildren:
                () => import('../pages/group-management/group-management.module').then(m => m.GroupManagementModule),
            },
            {
                path: 'error-logs',
                loadChildren:
                () => import('../pages/error-logs/error-logs.module').then(m => m.ErrorLogsModule),
            },
            {
                path: 'history',
                loadChildren:
                () => import('../pages/history/history.module').then(m => m.HistoryModule),
            }

        ]
    },
    { path: '', redirectTo: '/individual', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutsRoutingModule { }
