import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { KanbanService } from '../kanban.service';
import { ToastService } from '@services/toast-notification.service';
import { v4 as generateUID } from 'uuid';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { IKanbanTodo, kanbanPriority } from '@models/interfaces-model';
import { InputSelectComponent } from '@components/input-select/input-select.component';
import { hasEmptyValues } from '@functions/validate-empty-values';
import { InputDatePickerComponent } from '@components/input-date-picker/input-date-picker.component';

@Component({
  imports: [
    FormsModule,
    ModalTemplateComponent,
    MEInputTextComponent,
    InputSelectComponent,
    InputDatePickerComponent,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './modal-kanban-item.component.html',
  styleUrl: './modal-kanban-item.component.scss',
})
export class ModalKanbanItemComponent implements OnInit, OnDestroy {
  private readonly toast = inject(ToastService);
  private readonly kanbanService = inject(KanbanService);
  private readonly dialog = inject(MatDialog);
  private readonly cd = inject(ChangeDetectorRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: { data: IKanbanTodo; columnName: kanbanStatus },
  ) {}

  bodyItem: IKanbanTodo = new IKanbanTodo();
  columnName: kanbanStatus;

  prioValues = kanbanPriority;

  isEditModal = false;

  priorityList = Object.keys(kanbanPriority);
  formHasEmptyValues: boolean = true;

  ngOnInit(): void {
    if (this.modalData.data) {
      this.formHasEmptyValues = false;
      this.bodyItem = this.modalData.data;

      this.columnName = this.bodyItem.status;
      this.isEditModal = true;
    } else {
      this.bodyItem.status = this.modalData.columnName;
    }
  }

  handleConfirm() {
    if (this.isEditModal) {
      this.kanbanService.updateKanbanItem(this.bodyItem).subscribe({
        next: () => {
          this.cd.detectChanges();
          this.dialog.closeAll();
        },
        error: (error) => {
          console.error(error);
          this.toast.toastError('Não foi possível atualizar a tarefa.');
        },
      });
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
          this.toast.toastError('Não foi possível criar a tarefa.');
        },
      });
    }
  }

  checkValidation() {
    const { id, status, ...body } = this.bodyItem;
    this.formHasEmptyValues = hasEmptyValues(body);
  }

  ngOnDestroy(): void {
    this.bodyItem = new IKanbanTodo();
  }
}
