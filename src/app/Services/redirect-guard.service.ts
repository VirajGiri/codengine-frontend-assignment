import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuardService implements CanActivate  {

  userRole;
  constructor(
    private router: Router,
    private login:LoginService,
    private activeRoute: ActivatedRoute
    ) { 
      this.userRole = this.login.getData().Role;
      console.log("this.userRole",this.userRole);
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {

    if(this.login.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }

  }
}
