import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AbstractService } from 'src/app/Services/common/abstract.service';
import { LoginService } from 'src/app/Services/login.service';
import { CounsellorData, CounsellorDataRes } from '../interfaces/counsellor-data.module';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService extends AbstractService{

  constructor(protected http: HttpClient, private login:LoginService) {
    super();
   }

  GetInsurenceFormList():Observable<CounsellorData>{
    const httpParams = new HttpParams()
    const body = {
      'counsellorId': this.login.getData()['_id']
    }
    return this.http.post<CounsellorData>(`${this.localUrl}api/get_all_insurance`,body, {params:httpParams})
    .pipe(catchError(this.handleError))
  }
}
