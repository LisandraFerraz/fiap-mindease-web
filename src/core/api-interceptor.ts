import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { environment } from './environment';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { endpoints } from './endpoints';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('auth_token') || '';

  let cloned;
  let baseurl;

  if (req.url.includes(endpoints.listUserData)) {
    baseurl = environment.data_api;
  } else {
    baseurl = environment.auth_api;
  }

  cloned = req.clone({
    url: `${baseurl}${req.url}`,
  });

  return next(cloned);
};
