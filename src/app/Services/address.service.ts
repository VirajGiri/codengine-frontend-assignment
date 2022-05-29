import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { addressData, addressRes } from '../Interface/address/address.module';
import { AbstractService } from './common/abstract.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends AbstractService{

  constructor(protected http: HttpClient,private login:LoginService) {
    super();
  }


  AddInsurance(mailId:string, username:string,
    password:string,contactOne:string,contactTwo:string,aadhaarNumber:string,
    fullName:string,address:string,mobileDetails:string,paymentDetails:string):Observable<addressRes>{
    const httpParams = new HttpParams()
    const body = {
      'mailId': mailId,
      'username':username,
      'password':password,
      'fullName': fullName,
      'address': address,
      'contactOne':contactOne,
      'contactTwo':contactTwo,
      'aadhaarNumber':aadhaarNumber,
      'mobileDetails': mobileDetails,
      'paymentDetails':paymentDetails,
      'userId':this.login.getData()['_id'],
      'isActive':false,
      'isDeleted':false,
      'isVerified':false,
      'formBy':this.login.getData()['Role']
    }
    return this.http.post<addressRes>(`${this.localUrl}api/add_insurance`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }

  GetAddressList():Observable<addressData>{
    return this.http.get<addressData>(`${this.localUrl}api/get_address_list`)
    .pipe(catchError(this.handleError))
  }

 
  UpdateAddress(userId:string,
    username:string,mailId:string,
    password:string,confirm_password:string,fullName:string,
    Id:string,aadhaarNumber:string,
    contactOne:string,contactTwo:string,address:string,
    mobileDetails:any,paymentDetails:any,isActive:boolean,isDeleted:boolean,
    formBy:string):Observable<addressRes>{
    const httpParams = new HttpParams()
    const body = {
      'mailId': mailId,
      'username': username,
      'password': password,
      'confirm_password': confirm_password,
      'fullName': fullName,
      'address': address,
      '_id':Id,
      'contactOne':contactOne,
      'contactTwo':contactTwo,
      'aadhaarNumber':aadhaarNumber,
      'mobileDetails':mobileDetails,
      'paymentDetails':paymentDetails,
      'userId':userId,
      'isActive':isActive,
      'isDeleted':isDeleted,
      'formBy':formBy
    }
    return this.http.post<addressRes>(`${this.localUrl}api/update_insurance`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }

  DeleteInsurance(Id:string):Observable<addressRes>{
    const httpParams = new HttpParams()
    const body = {
      '_id':Id}
    return this.http.post<addressRes>(`${this.localUrl}api/delete_insuranceby_id`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }

  upload(file: File,insurenceId:string,filefor:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('insurenceId', insurenceId);
    formData.append('userId', this.login.getData()['_id'] || '');
    if(filefor === 'aadhaar_pic_front'){
      formData.append('aadhaar_pic_front', '1');
    }
    if(filefor === 'aadhaar_pic_back'){
      formData.append('aadhaar_pic_back', '1');
    }
    if(filefor === 'upload_photo_front'){
      formData.append('upload_photo_front', '1');
    }
    if(filefor === 'upload_photo_back'){
      formData.append('upload_photo_back', '1');
    }

    const req = new HttpRequest('POST', `${this.localUrl}api/upload_file`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  download(path:string):Observable<any>{
    const body = {
      'fileLocation':path}
    return this.http.post(`${this.localUrl}api/download_file`,body,{responseType: "blob" })
    .pipe(catchError(this.handleError))
  }
}
