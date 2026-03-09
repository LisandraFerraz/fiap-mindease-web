import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { apiInterceptor } from '../core/api-interceptor';
import { provideToastr } from 'ngx-toastr';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideLoadingBarInterceptor } from '@ngx-loading-bar/http-client';
import { provideHighcharts } from 'highcharts-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHighcharts({
      instance: () => import('highcharts'),
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([apiInterceptor]), withInterceptorsFromDi()),
    provideLoadingBarInterceptor(),
    provideToastr(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
};
