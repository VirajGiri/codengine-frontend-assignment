import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLoggedIn: boolean = false;
  constructor(
    private router: Router
    ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    var isUserLogin = localStorage.getItem("isUserLogin");
    if(isUserLogin){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }
    
  }
}
