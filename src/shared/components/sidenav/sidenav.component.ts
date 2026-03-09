import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SlicePipe } from '@angular/common';
import { ThemeModeService } from '@services/theme-service/theme-mode.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsModalComponent } from '../../../app/notifications-modal/notifications-modal.component';
import { NotificationService } from '../../../app/notifications-modal/notifications.service';

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
  private readonly dialog = inject(MatDialog);
  private readonly notificationsService = inject(NotificationService);

  isSidenavOpened = signal(false);
  hasNotif: boolean = false;

  get navItems(): INavItems[] {
    return [
      {
        name: 'Dashboard',
        route: 'dashboard',
        icon: 'home',
        isActive: this.checkActiveRoute('dashboard'),
      },
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
        name: 'Checklist',
        route: 'checklist',
        icon: 'checklist_rtl',
        isActive: this.checkActiveRoute('checklist'),
      },
      {
        name: 'Post-its',
        route: 'post-its',
        icon: 'note_stack',
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
    this.updateNotifs();
  }

  checkNotifs(): void {
    this.notificationsService.notifsNumber$.subscribe({
      next: (res) => {
        this.hasNotif = res !== 0;
      },
    });
  }

  updateNotifs() {
    this.notificationsService.getAllNotifications().subscribe({
      next: (res) => {
        const arraysLen = res.checklistNotificacoes.length + res.kanbanNotificacoes.length;
        this.notificationsService.setNotifNumber(arraysLen);
        this.checkNotifs();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  checkActiveRoute(item: string): boolean {
    return this.route.url.includes(item.toLowerCase());
  }

  setNavVisible() {
    this.isSidenavOpened.update((isOpen) => !isOpen);
  }

  toggleTheme() {
    this.themeMode.toggleTheme();
  }

  openModal() {
    this.dialog
      .open(NotificationsModalComponent, {
        minWidth: '600px',
      })
      .afterClosed()
      .subscribe({
        next: () => this.updateNotifs(),
      });
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/landing']);
  }
}
