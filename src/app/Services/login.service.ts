import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { User, UserData } from '../Interface/User/user.module';
import { AbstractService } from './common/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AbstractService{
  constructor(protected http: HttpClient,private router:Router) {
    super();
  }

  loginUser(username:string, password:string):Observable<User>{
    const httpParams = new HttpParams()
    const body = {'username':username,'password':password}
    return this.http.post<User>(`${this.localUrl}api/login`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }
  loadSidebar(role:any){
    const body = {'role':role}
    return this.http.post<any>(`${this.localUrl}api/get_rolebaseSidebar`,body)
    .pipe(catchError(this.handleError))
  }
  userProfile(){
    const body = {'_id':this.getData()._id}
    return this.http.post<any>(`${this.localUrl}api/get_user_profile`,body)
    .pipe(catchError(this.handleError))
  }
  
  login(userData:any){
    localStorage.setItem('userData',JSON.stringify(userData));
    localStorage.setItem("isUserLogin",'true')
    this.goToHome();
  }

  setToken(token:any){
    localStorage.setItem('token',token)
  }
  getToken(){
    const token = localStorage.getItem('token');
     return token !== null ? token : '';
  }

  goToHome(){
    this.router.navigate(['in'])
  }

  getData(): UserData{
    const user = localStorage.getItem('userData');
    return user === null ? null : JSON.parse(user);
  }
  isLoggedIn(){
   return localStorage.getItem("isUserLogin");
  }
  removeItems(){
    localStorage.removeItem("userData");
    localStorage.removeItem("isUserLogin");
    this.router.navigate(['login'])
  }
}
