import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { INotification } from '@models/notification-model';

@Component({
  selector: 'notification-card',
  imports: [MatIcon],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss',
})
export class NotificationCardComponent {
  @Input() notifData: INotification;

  @Output() markAsRead = new EventEmitter<void>();
  @Output() goToRoute = new EventEmitter<void>();

  handleClick() {
    this.markAsRead.emit();
  }

  handleGoToRoute() {
    this.goToRoute.emit();
  }

  get icon() {
    let icon = '';
    switch (this.notifData.alertType) {
      case 'EXPIRED':
        icon = 'assignment_late';
        break;
      case 'SOON':
        icon = 'schedule';
        break;
      case 'TODAY':
        icon = 'today';
        break;
      default:
        break;
    }
    return icon;
  }
}
