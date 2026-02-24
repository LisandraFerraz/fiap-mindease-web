import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { IKanbanTodo, kanbanPriority, kanbanStatus } from '@models/interfaces-model';
import { KanbanService } from '../../kanban.service';
import { ToastNotification } from '@services/toast-notification.service';
import { v4 as generateUID } from 'uuid';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

@Component({
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ModalTemplateComponent,
    MEInputTextComponent,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './modal-kanban-item.component.html',
  styleUrl: './modal-kanban-item.component.scss',
})
export class ModalKanbanItemComponent implements OnInit, OnDestroy {
  private readonly toastNotif = inject(ToastNotification);
  private readonly kanbanService = inject(KanbanService);
  private readonly dialog = inject(MatDialog);
  private readonly datePipe = inject(DatePipe);
  private cd = inject(ChangeDetectorRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: { data: IKanbanTodo; columnName: kanbanStatus },
  ) {}

  bodyItem: IKanbanTodo = new IKanbanTodo();
  columnName: kanbanStatus;

  prioValues = kanbanPriority;

  isEditModal = false;
  minDate = new Date();

  ngOnInit(): void {
    if (this.modalData.data) {
      this.bodyItem = this.modalData.data;
      this.columnName = this.bodyItem.status;
      this.isEditModal = true;
    } else {
      this.bodyItem.status = this.modalData.columnName;
    }

    console.log(this.bodyItem.priority);
  }

  handleConfirm() {
    if (this.isEditModal) {
      if (this.bodyItem.dueDate) {
        const date = this.datePipe.transform(this.bodyItem.dueDate, 'dd/MM/yyyy');

        this.bodyItem = {
          ...this.bodyItem,
          dueDate: String(date),
        };

        this.kanbanService.updateKanbanItem(this.bodyItem).subscribe({
          next: () => {
            this.dialog.closeAll();
          },
          error: (error) => {
            console.error(error);
            this.toastNotif.toastError('Não foi possível atualizar a tarefa.');
          },
        });
      }
    } else {
      const body = {
        ...this.bodyItem,
        id: generateUID(),
      };
      this.kanbanService.addNewKanbanItem(body).subscribe({
        next: () => {
          this.dialog.closeAll();
        },
        error: (error) => {
          console.error(error);
          this.toastNotif.toastError('Não foi possível criar a tarefa.');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.bodyItem = new IKanbanTodo();
  }
}
