import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./layouts/login-layout/login-layout.module').then(m => m.LoginLayoutModule),
    },
    {
        path: 'firstlogin',
        loadChildren: () => import('src/app/pages/first-login/first-login.module').then(m => m.FirstLoginModule),
    },
    {
        path: '**',
        redirectTo: '',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
