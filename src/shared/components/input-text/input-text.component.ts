import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getMinDate } from '../../../app/pages/kanban/modal-kanban-item/utils/format-date';

@Component({
  selector: 'me-input-text',
  imports: [FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class MEInputTextComponent {
  @Input() type: 'text' | 'password' | 'date' = 'text';
  @Input() label = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  handleChange(event: Event) {
    const fieldValue = (event.target as HTMLInputElement).value;
    this.value = fieldValue;
    this.valueChange.emit(fieldValue);
  }
}
