import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { KanbanService } from './kanban.service';
import { IKanbanColumn, IKanbanTodo } from '@models/interfaces-model';
import { ToastNotification } from '@services/toast-notification.service';
import { MatIcon } from '@angular/material/icon';
import { KanbanCardComponent } from '@components/kanban-card/kanban-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalKanbanItemComponent } from './modal-kanban-item/modal-kanban-item.component/modal-kanban-item.component';

@Component({
  selector: 'app-kanban',
  imports: [Sidenav, MatIcon, KanbanCardComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit, OnDestroy {
  private readonly kanbanService = inject(KanbanService);
  private readonly dialog = inject(MatDialog);
  private toastNotif = inject(ToastNotification);
  private cd = inject(ChangeDetectorRef);

  kanbanColumns: IKanbanColumn[] = [];

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

  private updateChanges(data: IKanbanColumn[]) {
    this.kanbanColumns = data;
    this.cd.detectChanges();
  }

  openModal(data?: IKanbanTodo) {
    this.dialog.open(ModalKanbanItemComponent, {
      data: data ? { data, isNew: false } : { isNew: true },
    });
  }

  ngOnDestroy(): void {}
}
