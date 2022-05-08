import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  public localUrl: string = 'http://localhost:3000/';
  
  constructor() { }
  protected handleError = (error: HttpErrorResponse) => {
    if(error == undefined || error.error == undefined)
    return throwError("Cannot Get Data");
    return throwError(error.error.messege);
  }
}
