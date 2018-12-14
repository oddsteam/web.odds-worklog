import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateComponent } from '../pages/corporate/corporate.component';
import { EditProfileComponent } from '../pages/edit-profile/edit-profile.component';
import { TableListUserBySiteComponent } from '../pages/group-management/component/table-list-user-by-site/table-list-user-by-site.component';
import { GroupManagementComponent } from '../pages/group-management/group-management.component';
import { IndividualComponent } from '../pages/individual/individual.component';
import { SettingComponent } from '../pages/setting/setting.component';
import { UsersManagementComponent } from '../pages/users-management/users-management.component';
import { LayoutsComponent } from './layouts.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutsComponent,
        children: [
            {
                path: 'editProfile',
                component: EditProfileComponent
            },
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
            },
            {
                path: 'usersManagement',
                component: UsersManagementComponent
            },
            {
                path: 'groupsManagement',
                component: GroupManagementComponent
            },
            {
                path: 'groupsManagement/users',
                component: TableListUserBySiteComponent
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
