import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  public localUrl: string = environment.api;
  
  constructor() { }
  protected handleError = (error: HttpErrorResponse) => {
    if(error == undefined || error.error == undefined)
    return throwError("Cannot Get Data");
    return throwError(error.error.messege);
  }
}
