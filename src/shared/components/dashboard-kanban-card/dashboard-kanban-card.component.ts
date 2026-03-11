import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GetKanbanPriority } from '@functions/get-kanban-keys';
import { IKanbanTodo } from '@models/interfaces-model';

@Component({
  selector: 'dashboard-kanban-card',
  imports: [MatIcon],
  templateUrl: './dashboard-kanban-card.component.html',
  styleUrl: './dashboard-kanban-card.component.scss',
})
export class DashboardKanbanCardComponent {
  private readonly router = inject(Router);

  @Input() data: IKanbanTodo;

  getPriority() {
    return GetKanbanPriority(this.data.priority);
  }

  goToKanban() {
    this.router.navigateByUrl('kanban');
  }
}
