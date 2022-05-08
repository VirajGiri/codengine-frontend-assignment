import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptService implements HttpInterceptor{

  constructor(private router: Router) { }


  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        this.router.navigateByUrl(`/login`);
        // if you've caught / handled the error, 
        // you don't want to rethrow it unless you also want downstream 
        //consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next.handle(req).pipe(catchError(x=> this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
}
}
