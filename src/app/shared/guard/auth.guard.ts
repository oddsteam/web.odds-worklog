import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WorklogApiService } from '../../core/worklog-api.service';
import { FirstLogin } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  fistLogin: FirstLogin;
  constructor(private router: Router, private worklogApiService: WorklogApiService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.fistLogin = this.worklogApiService.getFirstLogin();
    console.log('test', this.fistLogin);
    if (sessionStorage.getItem('token')) {
      if (this.fistLogin.firstLogin === 'Y') {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
