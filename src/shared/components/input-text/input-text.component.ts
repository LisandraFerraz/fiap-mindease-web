import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTemplateComponent } from '@components/input-template/input-template.component';

@Component({
  selector: 'me-input-text',
  imports: [FormsModule, CommonModule, InputTemplateComponent],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class MEInputTextComponent {
  @Input() type: 'text' | 'password' | 'date' = 'text';
  @Input() label = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() class: string[] = [''];
  @Input() errorMsg: string = '';
  @Input() required: boolean;
  @Input() maxLen: number;
  @Output() valueChange = new EventEmitter<string>();

  handleChange(event: Event) {
    const fieldValue = (event.target as HTMLInputElement).value;
    this.value = fieldValue;
    this.valueChange.emit(fieldValue);
  }
}
