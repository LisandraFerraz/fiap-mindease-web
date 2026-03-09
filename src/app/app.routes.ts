import { Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then((m) => m.LandingPageComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'pomodoro',
    loadComponent: () =>
      import('./pages/pomodoro/pomodoro.component').then((m) => m.PomodoroComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'kanban',
    loadComponent: () => import('./pages/kanban/kanban.component').then((m) => m.KanbanComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'checklist',
    loadComponent: () =>
      import('./pages/checklist/checklist.component').then((m) => m.ChecklistComponent),

    canActivate: [AuthGuard],
  },
  {
    path: 'post-its',
    loadComponent: () =>
      import('./pages/sticky-notes/sticky-notes.component').then((m) => m.StickyNotesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'preferencias',
    loadComponent: () =>
      import('./pages/preferencias/preferencias.component').then((m) => m.PreferenciasComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'pagina-nao-encontrada',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada',
  },
];
