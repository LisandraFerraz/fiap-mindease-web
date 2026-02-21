import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // const token = sessionStorage.getItem('auth_token') || '';

  let cloned;
  let baseurl;

  cloned = req.clone({
    url: `${baseurl}${req.url}`,
  });

  return next(cloned);
};
