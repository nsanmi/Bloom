import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from '../service/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private util: UtilService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedusertypes = next.data.allowedusertypes;
    const isAuthorized = this.util.isAthourized(allowedusertypes);
    const loggedin = this.util.isLoggedIn();
    if (loggedin) {
      if (!isAuthorized) {
        this.router.navigateByUrl('unauthorized');
      } else {
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    else {
      this.router.navigate(['/']);
    }
  }
  
}
