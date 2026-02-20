import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'me-input-text',
  imports: [FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class MEInputTextComponent {
  @Input() type: 'text' | 'password' = 'text';
  @Input() label = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Output() changeEvent = new EventEmitter<string>();

  handleChange(event: Event) {
    const fieldValue = (event.target as HTMLInputElement).value;
    this.changeEvent.emit(fieldValue);
  }
}
