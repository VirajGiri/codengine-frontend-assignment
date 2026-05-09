import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from './loader.service';
import { LoginService } from './login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const user = inject(LoginService);

  loaderService.isLoading.next(true);

  return next(
    req.clone({
      setHeaders: {
        'x-access-token': `${user.getToken()}`
      }
    })
  ).pipe(
    finalize(() => loaderService.isLoading.next(false))
  );
};

