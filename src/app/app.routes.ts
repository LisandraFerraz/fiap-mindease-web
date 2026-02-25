import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { AuthGuard } from '../core/auth-guard.service';
import { KanbanComponent } from './pages/kanban/kanban.component';
import { ChecklistComponent } from './pages/checklist.component/checklist.component';
import { StickyNotesComponent } from './pages/sticky-notes/sticky-notes.component';

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
  {
    path: 'kanban',
    component: KanbanComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lista-de-tarefas',
    component: ChecklistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post-its',
    component: StickyNotesComponent,
    canActivate: [AuthGuard],
  },
  // to-do: not found page
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
