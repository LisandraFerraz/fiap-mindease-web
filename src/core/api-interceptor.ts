import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './env/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const tools_id = sessionStorage.getItem('platToolsId') || '';
  const accessToken = sessionStorage.getItem('accessToken') || '';

  let endpoindUrl = req.url;

  if (tools_id && accessToken) {
    if (endpoindUrl.includes(':id')) {
      endpoindUrl = req.url.replace(':id', tools_id);
    }
  } else {
    router.navigateByUrl('/');
  }

  let cloned = req.clone({
    url: `${environment.data_api}${endpoindUrl}`,
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
  });

  return next(cloned);
};
