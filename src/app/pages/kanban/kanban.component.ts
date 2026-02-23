import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { KanbanService } from './kanban.service';
import { IKanbanColumn, IKanbanTodo } from '@models/interfaces-model';
import { ToastNotification } from '@services/toast-notification.service';
import { MatIcon } from '@angular/material/icon';
import { KanbanCardComponent } from '@components/kanban-card/kanban-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalKanbanItemComponent } from './modal-kanban-item/modal-kanban-item.component/modal-kanban-item.component';
import {
  CdkDrag,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  imports: [DragDropModule, Sidenav, MatIcon, KanbanCardComponent, CdkDropList, CdkDrag],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit, OnDestroy {
  private readonly kanbanService = inject(KanbanService);
  private readonly dialog = inject(MatDialog);
  private readonly toastNotif = inject(ToastNotification);
  private readonly cd = inject(ChangeDetectorRef);

  kanbanColumns: IKanbanColumn[];

  ngOnInit(): void {
    this.listKanbanItems();
  }

  private listKanbanItems() {
    this.kanbanService.getKanbanItems().subscribe({
      next: (res: IKanbanColumn[]) => {
        this.updateChanges(res);
      },
      error: (error) => {
        console.error('listKanbanItems :: ', error);
        this.toastNotif.toastError('Erro ao listar itens do Kanban.');
      },
    });
  }

  deleteKanbanItem(id: string) {
    this.kanbanService.deleteKanbanItem(id).subscribe({
      next: (res: IKanbanColumn[]) => {
        this.updateChanges(res);
      },
      error: (error) => {
        console.error('listKanbanItems :: ', error);
        this.toastNotif.toastError('Erro ao deleter item.');
      },
    });
  }

  updateColumnItem(newColumnId: string, data: IKanbanTodo) {
    const body = {
      ...data,
      status: newColumnId,
    } as IKanbanTodo;

    this.kanbanService.updateKanbanItem(body).subscribe({
      error: (error) => {
        console.error('listKanbanItems :: ', error);
        this.toastNotif.toastError('Não foi possível salvar suas alterações.');
      },
    });
  }

  private updateChanges(data: IKanbanColumn[]) {
    this.kanbanColumns = data;
    this.cd.detectChanges();
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

  openModal(columnId?: string, data?: IKanbanTodo) {
    this.dialog
      .open(ModalKanbanItemComponent, {
        data: data ? { data } : { columnName: columnId },
        width: '900px',
      })
      .afterClosed()
      .subscribe(() => this.listKanbanItems());
  }

  get connectedLists(): string[] {
    return this.kanbanColumns.map((col) => col.id);
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
