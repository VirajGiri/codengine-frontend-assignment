import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { addressData, addressRes } from '../Interface/address/address.module';
import { AbstractService } from './common/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends AbstractService{

  constructor(protected http: HttpClient,) {
    super();
  }


  AddAddress(CountryName:string, Location:string,
    BankName:string,
    City:string,State:string,Zip:string):Observable<addressRes>{
    const httpParams = new HttpParams()
    const body = {
      'CountryName': CountryName,
      'Location': Location,
      'BankName': BankName,
      'City': City,
      'State': State,
      'Zip': Zip
    }
    return this.http.post<addressRes>(`${this.localUrl}api/add_address`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }

  GetAddressList():Observable<addressData>{
    return this.http.get<addressData>(`${this.localUrl}api/get_address_list`)
    .pipe(catchError(this.handleError))
  }

 
  UpdateAddress(CountryName:string, Location:string,
    BankName:string,
    City:string,State:string,Zip:number,Id:string):Observable<addressRes>{
    const httpParams = new HttpParams()
    const body = {
      'CountryName': CountryName,
      'Location': Location,
      'BankName': BankName,
      'City': City,
      'State': State,
      'Zip': Zip,
      '_id':Id
    }
    return this.http.post<addressRes>(`${this.localUrl}api/update_address_by_id`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }

  DeleteAddress(Id:string):Observable<addressRes>{
    const httpParams = new HttpParams()
    const body = {
      '_id':Id}
    return this.http.post<addressRes>(`${this.localUrl}api/delete_address_by_id`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }

}
