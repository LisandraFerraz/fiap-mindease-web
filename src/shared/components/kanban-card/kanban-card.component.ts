import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GetKanbanPriority } from '@functions/get-kanban-keys';
import { IKanbanTodo, kanbanPriority } from '@models/interfaces-model';

@Component({
  selector: 'kanban-card',
  imports: [MatIcon],
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss'],
})
export class KanbanCardComponent {
  @Input() data: IKanbanTodo;
  @Output() deleteItem = new EventEmitter<void>();
  @Output() openModal = new EventEmitter<void>();

  getPriority() {
    return GetKanbanPriority(this.data.priority);
  }

  handleDelete() {
    this.deleteItem.emit();
  }

  handleOpenModal() {
    this.openModal.emit();
  }
}
