import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router){};
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    let isLoggedIn: BehaviorSubject<boolean> = this.AuthService.isAuthenticated$();
    if (isLoggedIn.getValue()){
      return true
    } else {
      this.router.navigate(['/signin']);
    }
    return false;
  }
  
}
