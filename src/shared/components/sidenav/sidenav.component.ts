import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FocusModeService } from '../../services/focus-mode.service';

interface INavItems {
  name: string;
  route: string;
  icon: string;
  isActive: boolean;
}

@Component({
  selector: 'sidenav',
  imports: [MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class Sidenav {
  route = inject(Router);
  focusMode = inject(FocusModeService);

  isFocusOn = this.focusMode.focusOn;

  isSidenavOpened = signal(false);

  get navItems(): INavItems[] {
    return [
      {
        name: 'Pomodoro',
        route: 'pomodoro',
        icon: 'timer',
        isActive: this.checkActiveRoute('pomodoro'),
      },
      {
        name: 'Kanban',
        route: 'kanban',
        icon: 'view_kanban',
        isActive: this.checkActiveRoute('kanban'),
      },
      {
        name: 'Lista de tarefas',
        route: 'lista-de-tarefas',
        icon: 'checklist_rtl',
        isActive: this.checkActiveRoute('lista-de-tarefas'),
      },
      {
        name: 'Post-its',
        route: 'post-its',
        icon: 'note',
        isActive: this.checkActiveRoute('post-its'),
      },
    ];
  }

  checkActiveRoute(item: string): boolean {
    return this.route.url.includes(item.toLowerCase());
  }

  setNavVisible() {
    // if (!this.isFocusOn() ) {
    this.isSidenavOpened.update((isOpen) => !isOpen);
    // }
  }

  isNavVisible() {
    return !this.isFocusOn() && this.isSidenavOpened();
  }
}
