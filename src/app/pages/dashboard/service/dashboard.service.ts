import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '@core/env/endpoints';
import { IDashboardRes } from '@models/dashboard-model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  listPomodoroTasks() {
    return this.http.get<IDashboardRes>(`${endpoints.dashboard}`);
  }
}
