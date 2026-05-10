import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, Subject } from 'rxjs';
import { UserData, UserDataRes } from '../Home/Admin/Interfaces/user-data.module';
import { AbstractService } from './common/abstract.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractService{

  userRoles = new Subject();
  constructor(protected http: HttpClient, private login:LoginService) {
    super();
   }

   GetAllUsers():Observable<UserData>{
    let body = {};
     if(this.login.getData()!.Role == "admin"){
        body = {
          'admin': true
        }
     }else{
      body = {
        'userId': this.login.getData()!['_id']
      }
     }
    
    return this.http.post<UserData>(`${this.localUrl}api/get_all_users`,body)
    .pipe(catchError(this.handleError))
  }
  
  AddUser(Name:string,Email:string,Role:string,username:string,
    Address:string,City:string,State:string,
    MobileNo:string,Landmark:string,Zip:string,
    BranchName:string,BranchCity:string):Observable<UserDataRes>{
    const httpParams = new HttpParams()
    const body = {
            'Name':Name,
            'Email':Email,
            'Role': Role,
            'username': username,
            'password': '1234',
            'AssignEnquiry': 0,
            'CompletedEnquiry': 0,
            'Address': Address,
            'City':City,
            'State':'Maharashtra',
            'MobileNo': MobileNo,
            'Landmark': Landmark,
            'Zip':Zip,
            'BranchName': BranchName,
            'BranchCity': BranchCity,
            'BranchState': 'Maharashtra',
            'isActive': true,
            'created_by': 'admin',
            'created_by_id': this.login.getData()!['_id']
    }
    return this.http.post<UserDataRes>(`${this.localUrl}api/add_user`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }

  UpdateUser(id:string,Name:string,Role:string,AssignEnquiry:string,
    CompletedEnquiry:string,Address:string,City:string,State:string,
    MobileNo:string,Landmark:string,Zip:string,
    BranchName:string,BranchCity:string):Observable<UserDataRes>{
    const httpParams = new HttpParams()
    const body = {
            '_id':id,
            'Name':Name,
            'Role': Role,
            'AssignEnquiry': AssignEnquiry,
            'CompletedEnquiry': CompletedEnquiry,
            'Address': Address,
            'City':City,
            'State':State,
            'MobileNo': MobileNo,
            'Landmark': Landmark,
            'Zip':Zip,
            'BranchName': BranchName,
            'BranchCity': BranchCity,
            'BranchState': 'Maharashtra'
    }
    return this.http.post<UserDataRes>(`${this.localUrl}api/update_user`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }
  setUserRoles(data:any){
    // this.userRoles.next(data);
    localStorage['allowedRoles'] = JSON.stringify(data);
  }
  getUserRoles(){
    // return this.userRoles.asObservable();
    return localStorage['allowedRoles'];
  }
  CheckUsername(username:string, excludeId?:string):Observable<{taken:boolean}>{
    const body:any = { username };
    if(excludeId) body['excludeId'] = excludeId;
    return this.http.post<{taken:boolean}>(`${this.localUrl}api/check_username`, body)
    .pipe(catchError(this.handleError));
  }
  ResetPasswordAdmin(userId:string):Observable<UserDataRes>{
    return this.http.post<UserDataRes>(`${this.localUrl}api/reset_password_admin`,{ _id: userId })
    .pipe(catchError(this.handleError));
  }
  deleteUser(id:string):Observable<UserDataRes>{
    const body = {
      '_id':id
    }
    const httpParams = new HttpParams()
    return this.http.post<UserDataRes>(`${this.localUrl}api/delete_user`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }
}

