import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTemplateComponent } from '@components/input-template/input-template.component';

@Component({
  selector: 'me-input-select',
  imports: [InputTemplateComponent],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
})
export class InputSelectComponent {
  @Input() value: string = '';
  @Input() options: any[];
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() errorMsg: string = '';
  @Input() required: boolean;
  @Output() valueChange = new EventEmitter<string>();

  handleChange(event: Event) {
    const fieldValue = (event.target as HTMLInputElement).value;
    this.value = fieldValue;
    this.valueChange.emit(fieldValue);
  }
}
