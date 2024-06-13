import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const jwtToken = storageService.getJwtToken();
  
  if(jwtToken !== null && jwtToken !== '') {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
  }

  return next(req);
};
