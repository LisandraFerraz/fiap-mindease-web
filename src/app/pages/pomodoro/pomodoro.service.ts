import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '../../../core/env/endpoints';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  private readonly http = inject(HttpClient);

  listPomodoroTasks() {
    return this.http.get(`${endpoints.pomodoro}`);
  }
}
