import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '@core/env/endpoints';
import { INotifResponse } from '@models/notification-model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly http = inject(HttpClient);

  getAllNotifications() {
    return this.http.get<INotifResponse>(`${endpoints.notifications}`);
  }

  markOneAsRead(id: string) {
    return this.http.delete<INotifResponse>(`${endpoints.notifications}/atualizar/${id}`);
  }

  markAllAsRead(body: string[]) {
    return this.http.patch<INotifResponse>(`${endpoints.notifications}/atualizar`, body);
  }
}
