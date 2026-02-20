import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'input-add-task',
  imports: [MatIcon],
  templateUrl: './input-add-task.component.html',
  styleUrl: './input-add-task.component.scss',
})
export class InputAddTask {
  @Input() inputId = '';
  @Input() placeholder = '';
  @Output() changeEvent = new EventEmitter<string>();

  handleChange(event: Event) {
    const fieldValue = (event.target as HTMLInputElement).value;
    this.changeEvent.emit(fieldValue);
  }
}
