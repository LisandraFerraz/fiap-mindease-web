import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { AuthGuard } from '../core/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'pomodoro',
    component: PomodoroComponent,
    canActivate: [AuthGuard],
  },
  // to-do: not found page
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
