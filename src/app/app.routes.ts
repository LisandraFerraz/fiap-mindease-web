import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'pomodoro',
    component: PomodoroComponent,
    canActivate: [],
  },
];
