import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { INotification, INotifResponse } from '@models/notification-model';
import { NotificationService } from './notifications.service';
import { NotificationCardComponent } from '@components/notification-card/notification-card.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications-modal',
  imports: [CommonModule, ModalTemplateComponent, NotificationCardComponent],
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.scss',
})
export class NotificationsModalComponent implements OnInit {
  private readonly notificationsService = inject(NotificationService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  allNotifications: INotifResponse;
  kanbanNotifications: INotification[];
  checklistNotifications: INotification[];

  kanbanNotifLayout: boolean = true;
  activeTab: INotification[];

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationsService.getAllNotifications().subscribe({
      next: (res: INotifResponse) => {
        this.allNotifications = res;
        this.kanbanNotifications = res.kanbanNotificacoes;
        this.checklistNotifications = res.checklistNotificacoes;

        !res.kanbanNotificacoes
          ? (this.kanbanNotifLayout = true)
          : (this.kanbanNotifLayout = false);

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  markOneAsRead(id: string) {
    this.notificationsService.markOneAsRead(id).subscribe();
    this.getNotifications();
  }

  markAllAsRead(notifs: INotification[]) {
    const ids = notifs.map((nt) => nt.id);

    this.notificationsService.markAllAsRead(ids).subscribe();
    this.getNotifications();
  }

  changeLayout() {
    this.kanbanNotifLayout = !this.kanbanNotifLayout;
  }

  goToIem(route: string) {
    this.router.navigateByUrl(route);
    this.dialog.closeAll();
  }
}
