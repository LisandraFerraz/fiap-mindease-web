import { Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then((m) => m.LandingPageComponent),
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
    loadChildren: () =>
      import('./pages/kanban/modal-kanban-item/modal-kanban-item.component').then(
        (m) => m.ModalKanbanItemComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'lista-de-tarefas',
    loadComponent: () =>
      import('./pages/checklist/checklist.component').then((m) => m.ChecklistComponent),
    loadChildren: () =>
      import('./pages/checklist/color-selector/color-selector.component').then(
        (m) => m.ColorSelectorComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'post-its',
    loadComponent: () =>
      import('./pages/sticky-notes/sticky-notes.component').then((m) => m.StickyNotesComponent),
    canActivate: [AuthGuard],
  },
  // to-do: not found page
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
