import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { insuranceFormData } from 'src/app/Interface/insurance/insurance-form.module';
import { AbstractService } from 'src/app/Services/common/abstract.service';
import { LoginService } from 'src/app/Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TeamleadService extends AbstractService{

  constructor(protected http: HttpClient, private login:LoginService) {
    super();
   }


  GetInsurenceFormList():Observable<insuranceFormData>{
    const httpParams = new HttpParams()
    const body = {
      'userId': this.login.getData()['_id']
    }
    return this.http.post<insuranceFormData>(`${this.localUrl}api/get_all_insurance`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }
}
