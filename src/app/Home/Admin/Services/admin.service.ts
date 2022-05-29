import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AbstractService } from 'src/app/Services/common/abstract.service';
import { LoginService } from 'src/app/Services/login.service';
import { AdminData } from '../Interfaces/admin-data.module';
import { UserData, UserDataRes } from '../Interfaces/user-data.module';
@Injectable({
  providedIn: 'root'
})
export class AdminService extends AbstractService{

  constructor(protected http: HttpClient, private login:LoginService) {
    super();
   }

   GetInsurenceFormList():Observable<AdminData>{
    const httpParams = new HttpParams()
    const body = {
      'admin': true
    }
    return this.http.post<AdminData>(`${this.localUrl}api/get_all_insurance`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }
  GetAllUsers():Observable<UserData>{
    return this.http.get<UserData>(`${this.localUrl}api/get_all_users`)
    .pipe(catchError(this.handleError))
  }
  AddUser(Name:string,Email:string,Role:string,username:string,
    Password:string,Address:string,City:string,State:string,
    MobileNo:string,Landmark:string,Zip:string):Observable<UserDataRes>{
    const httpParams = new HttpParams()
    const body = {
            'Name':Name,
            'Email':Email,
            'Role': Role,
            'username': username,
            'password': Password,
            'AssignEnquiry': 0,
            'CompletedEnquiry': 0,
            'Address': Address,
            'City':City,
            'State':State,
            'MobileNo': MobileNo,
            'Landmark': Landmark,
            'Zip':Zip,
            'isActive': true,
            'created_by': 'admin',
            'created_by_id': this.login.getData()['_id']
    }
    return this.http.post<UserDataRes>(`${this.localUrl}api/add_user`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }

  UpdateUser(id:string,Name:string,Role:string,AssignEnquiry:string,
    CompletedEnquiry:string,Address:string,City:string,State:string,
    MobileNo:string,Landmark:string,Zip:string):Observable<UserDataRes>{
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
            'Zip':Zip
    }
    return this.http.post<UserDataRes>(`${this.localUrl}api/update_user`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }
  

}
