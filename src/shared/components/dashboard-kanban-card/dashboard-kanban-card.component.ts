import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GetKanbanPriority } from '@functions/get-kanban-keys';
import { IKanbanTodo } from '@models/interfaces-model';

@Component({
  selector: 'dashboard-kanban-card',
  imports: [MatIcon],
  templateUrl: './dashboard-kanban-card.component.html',
  styleUrl: './dashboard-kanban-card.component.scss',
})
export class DashboardKanbanCardComponent {
  @Input() data: IKanbanTodo;

  getPriority() {
    return GetKanbanPriority(this.data.priority);
  }
}
