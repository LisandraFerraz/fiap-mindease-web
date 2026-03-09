import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { KanbanService } from './service/kanban.service';
import { IKanbanColumn, IKanbanTodo } from '@models/interfaces-model';
import { ToastService } from '@services/toast-notification/toast-notification.service';
import { MatIcon } from '@angular/material/icon';
import { KanbanCardComponent } from '@components/kanban-card/kanban-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalKanbanItemComponent } from './modal-kanban-item/modal-kanban-item.component';
import {
  CdkDrag,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban',
  imports: [DragDropModule, Sidenav, MatIcon, KanbanCardComponent, CdkDropList, CdkDrag],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit, OnDestroy {
  private readonly kanbanService = inject(KanbanService);
  private readonly dialog = inject(MatDialog);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly toast = inject(ToastService);

  kanbanColumns: IKanbanColumn[];

  ngOnInit(): void {
    this.listKanbanItems();
  }

  private listKanbanItems() {
    this.subscribeObservable(
      this.kanbanService.getKanbanItems(),
      'Erro ao listar itens do Kanban.',
    );
  }

  deleteKanbanItem(id: string) {
    this.subscribeObservable(this.kanbanService.deleteKanbanItem(id), 'Erro ao deleter item.');
  }

  updateColumnItem(newColumnId: string, data: IKanbanTodo) {
    const body = {
      ...data,
      status: newColumnId,
    } as IKanbanTodo;

    this.subscribeObservable(
      this.kanbanService.updateKanbanItem(body),
      'Não foi possível salvar suas alterações.',
    );
  }

  openModal(columnId?: string, data?: IKanbanTodo) {
    this.dialog
      .open(ModalKanbanItemComponent, {
        data: data ? { data } : { columnName: columnId },
        width: '900px',
      })
      .afterClosed()
      .subscribe(() => this.listKanbanItems());
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.updateColumnItem(event.container.id, event.item.data);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  subscribeObservable(
    obs: Observable<IKanbanColumn[]>,
    errorMsg: string,
    todoSuccess?: () => void,
  ) {
    obs.subscribe({
      next: (res: IKanbanColumn[]) => {
        if (todoSuccess) todoSuccess();
        this.updateChanges(res);
      },
      error: (error) => {
        console.error(error);
        this.toast.toastError(errorMsg);
      },
    });
  }

  private updateChanges(data: IKanbanColumn[]) {
    this.kanbanColumns = data;
    this.cd.detectChanges();
  }

  get connectedLists(): string[] {
    return this.kanbanColumns.map((col) => col.id);
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
