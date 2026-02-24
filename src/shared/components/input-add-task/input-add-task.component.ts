import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'input-add-task',
  imports: [MatIcon],
  templateUrl: './input-add-task.component.html',
  styleUrl: './input-add-task.component.scss',
})
export class InputAddTask {
  @Input() value: string = '';
  @Output() addTask = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<string>();

  isInputValid = signal(false);

  handleChange(event: Event) {
    const fieldValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(fieldValue);

    this.isInputValid.update((isValid) => (isValid = fieldValue.length >= 5));
  }

  handleClick() {
    if (this.isInputValid()) this.addTask.emit();
  }
}
