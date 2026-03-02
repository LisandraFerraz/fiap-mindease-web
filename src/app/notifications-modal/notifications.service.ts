import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '@core/env/endpoints';
import { INotifResponse } from '@models/notification-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly http = inject(HttpClient);

  notifsNumber$ = new BehaviorSubject<number>(0);
  readonly notifsNumber = this.notifsNumber$;

  // API
  getAllNotifications() {
    return this.http.get<INotifResponse>(`${endpoints.notifications}`);
  }

  markOneAsRead(id: string) {
    return this.http.delete<INotifResponse>(`${endpoints.notifications}/atualizar/${id}`);
  }

  markAllAsRead(body: string[]) {
    return this.http.patch<INotifResponse>(`${endpoints.notifications}/atualizar`, body);
  }

  // ACESSO LOCAL
  setNotifNumber(quantity: number) {
    this.notifsNumber$.next(quantity);
  }
}
