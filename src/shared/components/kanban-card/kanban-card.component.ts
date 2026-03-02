import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
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

  handleDelete() {
    this.deleteItem.emit();
  }

  handleOpenModal() {
    this.openModal.emit();
  }

  ngOnInit(): void {}

  getPriority() {
    const value = kanbanPriority[this.data.priority];

    const mapPriority = {
      [kanbanPriority.BAIXO]: 'baixo',
      [kanbanPriority.MEDIO]: 'médio',
      [kanbanPriority.ALTO]: 'alto',
    };

    return mapPriority[value];
  }
}
