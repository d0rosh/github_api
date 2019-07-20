import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (next.data.isAuth) {
      const current_route = this.router.routerState.snapshot['url'];
      if (
        next.data.isAuth &&
        this.authService.isAuthenticated() &&
        localStorage.getItem('isAuth')
      ) {
        this.router.navigate([current_route]);
        return of(false);
      } else {
        this.authService.setAuth(false);
        this.authService.setCurrentUser(null);
        return of(true);
      }
    } else if (
      this.authService.isAuthenticated() &&
      localStorage.getItem('isAuth')
    ) {
      return of(true);
    } else {
      this.authService.setAuth(false);
      this.authService.setCurrentUser(null);
      this.router.navigate(['auth'], {
        queryParams: {
          form: 'login',
          accessDenied: true
        }
      });
      return of(false);
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(next, state);
  }
}
