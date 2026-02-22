import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'todo-card',
  imports: [MatIconModule],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  @Input() description = '';
  @Input() isCompleted = false;
  @Output() markAs = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<void>();

  handleClick() {
    this.markAs.emit();
  }

  handleDelete() {
    this.deleteItem.emit();
  }
}
