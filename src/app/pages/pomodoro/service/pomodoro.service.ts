import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '@core/env/endpoints';
import { PomodoroTodo } from '@models/interfaces-model';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  private readonly http = inject(HttpClient);

  listPomodoroTasks() {
    return this.http.get<PomodoroTodo[]>(`${endpoints.pomodoro}`);
  }

  addPomodoroTask(body: PomodoroTodo) {
    return this.http.post<PomodoroTodo[]>(`${endpoints.addPomodoroTask}`, body);
  }

  deletePomodoroTask(id: string) {
    return this.http.delete<PomodoroTodo[]>(`${endpoints.deletePomodoroTask}/${id}`);
  }

  updatePomodoroTaskStatus(body: PomodoroTodo) {
    return this.http.patch<PomodoroTodo[]>(`${endpoints.atualizaPomodoroTask}`, body);
  }
}
