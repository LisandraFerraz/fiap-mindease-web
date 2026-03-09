import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { StickyNoteComponent } from '@components/sticky-note/sticky-note.component';
import { StickyNotesService } from './service/sticky-notes.service';
import { IStickyNotesResponse, StickyNote, StickyNotesGroup } from '@models/interfaces-model';

import { Observable } from 'rxjs';
import { v4 as generateUID } from 'uuid';
import { MatIcon } from '@angular/material/icon';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { ToastService } from '@services/toast-notification.service';

@Component({
  selector: 'app-sticky-notes.component',
  imports: [FormsModule, MatIcon, Sidenav, StickyNoteComponent, MEInputTextComponent],
  templateUrl: './sticky-notes.component.html',
  styleUrl: './sticky-notes.component.scss',
})
export class StickyNotesComponent implements OnInit {
  private readonly stickyService = inject(StickyNotesService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly toast = inject(ToastService);

  listaStickyNotesGroup: StickyNotesGroup[] = [];
  activeStickyNoteGroup: StickyNotesGroup;

  bodyStickyGroup = new StickyNotesGroup();
  bodyStickyNote = new StickyNote();

  keywordSeach = '';

  isEditable = signal(false);
  activeTabTitle = '';

  ngOnInit(): void {
    this.listAllStickyGroups();
  }

  listAllStickyGroups() {
    this.subscribeObservable(
      this.stickyService.listAllStickyGroups(),
      'Não foi possível recuperar os grupos de post-it.',
    );
  }

  createStickyNoteGroup() {
    const body = {
      ...this.bodyStickyGroup,
      groupName: 'Novo grupo',
      id: generateUID(),
    };

    this.stickyService.createStickyNotesGroup(body).subscribe({
      next: (res: IStickyNotesResponse) => {
        this.listaStickyNotesGroup = res.stickyNotes;

        const target = this.listaStickyNotesGroup.find(
          (st) => st.id === body.id,
        ) as StickyNotesGroup;
        this.setActiveGroup(target);

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.toast.toastError('Não foi possível criar o post-it.');
      },
    });
  }

  updateStickyNoteName(groupId: string, groupName: string) {
    if (groupName.length > 0) {
      const body = {
        groupName: groupName,
      };
      this.subscribeObservable(
        this.stickyService.updateStickyNotesGroup(groupId, body),
        'Não foi possível atualizar o nome do grupo.',
      );
    } else {
      this.activeStickyNoteGroup.groupName = this.activeTabTitle;
    }
  }

  addStickyNote() {
    const body = {
      ...this.bodyStickyNote,
      id: generateUID(),
      title: 'Novo post-it',
      description: 'Sem descrição...',
    };

    this.subscribeObservable(
      this.stickyService.addStickyNote(this.activeStickyNoteGroup.id, body),
      'Não foi possível criar o post-it.',
    );
  }

  updateStickyNote(emitterData: { fieldName: string; fieldValue: string }, noteId: string) {
    const body = {
      [emitterData.fieldName]: emitterData.fieldValue,
    } as Partial<StickyNote>;

    this.subscribeObservable(
      this.stickyService.updateStickyNote(this.activeStickyNoteGroup.id, body, noteId),
      'Não foi possível criar o post-it.',
    );
  }

  deleteStickyNote(noteId: string) {
    this.subscribeObservable(
      this.stickyService.deleteStickyNote(this.activeStickyNoteGroup.id, noteId),
      'Não foi possível excluir o post-it.',
    );
  }

  deleteStickyNotesGroup() {
    const updateActive = () => this.setActiveGroup(this.listaStickyNotesGroup[0]);

    this.subscribeObservable(
      this.stickyService.deleteStickyNotesGroup(this.activeStickyNoteGroup.id),
      'Não foi possível excluir o post-it.',
      updateActive,
    );
  }

  updateChanges(data: StickyNotesGroup[]) {
    this.listaStickyNotesGroup = data;

    if (this.activeStickyNoteGroup) {
      const activeCheckGroup = data.find((sn) => sn.id === this.activeStickyNoteGroup.id);
      activeCheckGroup
        ? this.setActiveGroup(activeCheckGroup)
        : this.setActiveGroup(this.listaStickyNotesGroup[0]);
    } else {
      this.setActiveGroup(this.listaStickyNotesGroup[0]);
    }
    this.cd.detectChanges();
  }

  setActiveGroup(data: StickyNotesGroup) {
    this.activeStickyNoteGroup = data;
    this.cd.detectChanges();
    this.activeTabTitle = data?.groupName;
  }

  subscribeObservable(
    obs: Observable<IStickyNotesResponse>,
    errorMsg: string,
    todoSuccess?: () => void,
  ) {
    obs.subscribe({
      next: (res: IStickyNotesResponse) => {
        if (todoSuccess) todoSuccess();
        this.updateChanges(res.stickyNotes);
      },
      error: (error) => {
        console.error(error);
        this.toast.toastError(errorMsg);
      },
    });
  }

  setIsEditable() {
    this.isEditable.update((editable) => (editable = true));
  }
}
