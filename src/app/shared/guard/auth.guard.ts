import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WorklogApiService } from '../../core/worklog-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private worklogApiService: WorklogApiService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userId = sessionStorage.getItem('idUser');
    if (sessionStorage.getItem('token') && userId) {
      this.worklogApiService.getUserByID(userId).subscribe(res => {
        if (res.firstName === '' || res.lastName === '') {
          this.router.navigate(['/login']);
          return false;
        }
      }, err => {
        this.router.navigate(['/login']);
        return false;
      });
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
