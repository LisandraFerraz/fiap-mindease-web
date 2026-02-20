import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'todo-card',
  imports: [MatIconModule],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  @Input() description = '';

  constructor() {}
}
