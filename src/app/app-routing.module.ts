import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: './layouts/layouts.module#LayoutsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: './layouts/login-layout/login-layout.module#LoginLayoutModule',
    },
    {
        path: 'firstlogin',
        loadChildren: 'src/app/pages/first-login/first-login.module#FirstLoginModule',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
