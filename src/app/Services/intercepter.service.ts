import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor{

  constructor(private loaderService:LoaderService,protected user:LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);

    return next.handle(
      req.clone({  
        setHeaders: {  
          'x-access-token': `${this.user.getToken()}`  
        }  
      })
    ).pipe(
      finalize(
        ()=>{
          this.loaderService.isLoading.next(false);
        }
      )
    )
  }
}
