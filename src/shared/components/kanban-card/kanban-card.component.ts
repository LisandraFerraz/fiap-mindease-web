import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { kanbanPriority } from '@models/interfaces-model';

@Component({
  selector: 'kanban-card',
  imports: [MatIcon],
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss'],
})
export class KanbanCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() priority: keyof typeof kanbanPriority;
  @Output() deleteItem = new EventEmitter<void>();
  @Output() openModal = new EventEmitter<void>();

  handleDelete() {
    this.deleteItem.emit();
  }

  handleOpenModal() {
    this.openModal.emit();
  }

  ngOnInit(): void {
    const result = this.getPriority('MEDIO');
    console.log(result);
  }

  getPriority(prioridade: keyof typeof kanbanPriority) {
    const value = kanbanPriority[prioridade];

    const mapPriority = {
      [kanbanPriority.BAIXO]: 'baixo',
      [kanbanPriority.MEDIO]: 'médio',
      [kanbanPriority.ALTO]: 'alto',
    };

    return mapPriority[value];
  }
}
