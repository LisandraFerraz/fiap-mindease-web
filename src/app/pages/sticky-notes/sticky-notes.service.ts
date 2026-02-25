import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '@core/env/endpoints';
import { IStickyNotesResponse, StickyNote, StickyNotesGroup } from '@models/interfaces-model';

@Injectable({
  providedIn: 'root',
})
export class StickyNotesService {
  private readonly http = inject(HttpClient);

  listAllStickyGroups() {
    return this.http.get<IStickyNotesResponse>(`${endpoints.stickyNotes}`);
  }

  listStickyNotesGroup(groupId: string) {
    return this.http.get<StickyNotesGroup>(`${endpoints.stickyNotes}/${groupId}`);
  }

  createStickyNotesGroup(body: StickyNotesGroup) {
    return this.http.post<IStickyNotesResponse>(`${endpoints.createStickyNotesGroup}`, body);
  }

  updateStickyNotesGroup(groupId: string, body: Partial<StickyNotesGroup>) {
    return this.http.patch<IStickyNotesResponse>(
      `${endpoints.stickyNotes}/${groupId}/atualiza-sticky-note-group`,
      body,
    );
  }

  addStickyNote(groupId: string, body: StickyNote) {
    return this.http.post<IStickyNotesResponse>(
      `${endpoints.stickyNotes}/${groupId}/novo-sticky-note`,
      body,
    );
  }

  updateStickyNote(groupId: string, body: Partial<StickyNote>, noteId: string) {
    return this.http.patch<IStickyNotesResponse>(
      `${endpoints.stickyNotes}/${groupId}/atualiza-sticky-note/${noteId}`,
      body,
    );
  }

  deleteStickyNotesGroup(groupId: string) {
    return this.http.delete<IStickyNotesResponse>(`${endpoints.deleteStickyNotesGroup}/${groupId}`);
  }

  deleteStickyNote(groupId: string, noteId: string) {
    return this.http.delete<IStickyNotesResponse>(
      `${endpoints.stickyNotes}/${groupId}/deleta-sticky-note/${noteId}`,
    );
  }
}
