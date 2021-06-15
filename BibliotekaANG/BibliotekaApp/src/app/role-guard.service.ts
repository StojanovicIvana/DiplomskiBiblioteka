import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.expectedRole;
    const uloga = sessionStorage.getItem('uloga');

    if (!this.auth.isLoggedIn() || uloga !== role) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }  
}
