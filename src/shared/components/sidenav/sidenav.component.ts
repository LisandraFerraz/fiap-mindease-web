import { Component, inject, signal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FocusModeService } from '../../services/focus-mode.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SlicePipe } from '@angular/common';
import { ThemeModeService } from '@services/theme-service/theme-mode.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsModalComponent } from '../../../app/notifications-modal/notifications-modal.component';

interface INavItems {
  name: string;
  route: string;
  icon: string;
  isActive: boolean;
}

@Component({
  selector: 'sidenav',
  imports: [SlicePipe, MatIconModule, LoadingBarHttpClientModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class Sidenav {
  private readonly themeMode = inject(ThemeModeService);
  private readonly route = inject(Router);
  private readonly focusMode = inject(FocusModeService);
  private readonly dialog = inject(MatDialog);

  isFocusOn = this.focusMode.focusOn;

  isSidenavOpened = signal(true);

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
      {
        name: 'Preferências',
        route: 'preferencias',
        icon: 'settings',
        isActive: this.checkActiveRoute('preferencias'),
      },
    ];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.openModal();
  }

  checkActiveRoute(item: string): boolean {
    return this.route.url.includes(item.toLowerCase());
  }

  setNavVisible() {
    // if (!this.isFocusOn() ) {
    this.isSidenavOpened.update((isOpen) => !isOpen);
    // }
    this.openModal();
  }

  isNavVisible() {
    return !this.isFocusOn() && this.isSidenavOpened();
  }

  toggleTheme() {
    console.log('el');
    this.themeMode.toggleTheme();
  }

  openModal() {
    this.dialog.open(NotificationsModalComponent, {
      minWidth: '600px',
    });
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/']);
  }
}
