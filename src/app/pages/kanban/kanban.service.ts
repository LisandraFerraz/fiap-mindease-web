import { IKanbanColumn, IKanbanTodo } from '@models//interfaces-model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '@core/env/endpoints';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private readonly http = inject(HttpClient);

  getKanbanItems() {
    return this.http.get<IKanbanColumn[]>(`${endpoints.kanban}`);
  }

  addNewKanbanItem(body: IKanbanTodo) {
    return this.http.post<IKanbanColumn[]>(`${endpoints.addKanbanTask}`, body);
  }

  updateKanbanItem(body: IKanbanTodo) {
    return this.http.post<IKanbanColumn[]>(`${endpoints.atualizaKanbanTask}`, body);
  }

  deleteKanbanItem(id: string) {
    return this.http.delete<IKanbanColumn[]>(`${endpoints.deleteKanbanTask}/${id}`);
  }
}
