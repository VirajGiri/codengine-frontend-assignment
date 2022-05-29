import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLoggedIn: boolean = false;
  userRole;
  constructor(
    private router: Router,
    private login:LoginService,
    private activeRoute: ActivatedRoute
    ) { 
      this.userRole = this.login.getData().Role;
    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.login.isLoggedIn()){
          // if (route.data['role'] && route.data['role'].indexOf(this.userRole) === -1) {
          //   console.log('iam in route',route.data['role'], route.data['role'].indexOf(this.userRole))
          //   this.router.navigate(["login"]);
          //   return false;
          // }
      return true;
    
    }else{
      this.router.navigate(["login"]);
      return false;
    }
    
  }
}

