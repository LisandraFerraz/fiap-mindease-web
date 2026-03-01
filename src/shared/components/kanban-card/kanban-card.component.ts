import { COMMA, L } from '@angular/cdk/keycodes';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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

  get daysLeft() {
    let message = '';

    const exceptionDue = ['CONCLUIDO', 'BACKLOG'];

    if (!exceptionDue.includes(this.data.status)) {
      const today = new Date();
      const dueDate = new Date(this.data.dueDate);

      var ndays;
      var tv1 = today.valueOf();
      var tv2 = dueDate.valueOf();

      ndays = (tv2 - tv1) / 1000 / 86400;
      ndays = Math.round(ndays + 1);

      switch (ndays) {
        case 1:
          message = 'Vence hoje!';
          break;

        default:
          message = `Restam ${ndays} dias`;
          break;
      }
    }

    return message;
  }
}
