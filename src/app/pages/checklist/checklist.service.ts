import { Checklist, ChecklistItem, IChecklistResponse } from '@models/interfaces-model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '@core/env/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private readonly http = inject(HttpClient);

  listChecklists() {
    return this.http.get<IChecklistResponse>(`${endpoints.checklists}`);
  }

  createChecklist(body: Checklist) {
    return this.http.post<IChecklistResponse>(`${endpoints.createChecklist}`, body);
  }

  atualizaChecklist(checklistId: string, body: Partial<Checklist>) {
    return this.http.patch<IChecklistResponse>(
      `${endpoints.checklists}/atualiza-checklist/${checklistId}`,
      body,
    );
  }

  deletaChecklist(checkId: string) {
    return this.http.delete<IChecklistResponse>(`${endpoints.deleteChecklist}/${checkId}`);
  }

  addChecklistItem(checkId: string, body: ChecklistItem) {
    return this.http.post<IChecklistResponse>(`${endpoints.checklists}/${checkId}/novo-item`, body);
  }

  atualizaChecklistItem(checklistId: string, body: ChecklistItem) {
    return this.http.patch<IChecklistResponse>(
      `${endpoints.atualizaChecklist}/${checklistId}/item/${body.id}`,
      body,
    );
  }

  deletaChecklistItem(checklistId: string, id: string) {
    return this.http.delete<IChecklistResponse>(
      `${endpoints.deleteChecklist}/${checklistId}/item/${id}`,
    );
  }
}
