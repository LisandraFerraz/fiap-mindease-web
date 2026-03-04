import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTemplateComponent } from '@components/input-template/input-template.component';
import { GetKanbanPriority, GetKanbanStatus } from '@functions/get-kanban-keys';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'me-input-select',
  imports: [InputTemplateComponent, FormsModule],
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
    const fieldValue = (event.target as HTMLSelectElement).value;
    this.value = fieldValue;
    this.valueChange.emit(fieldValue);
  }

  getKeyValue(key: any) {
    if (this.inputId === 'priority') return GetKanbanPriority(key);
    else return GetKanbanStatus(key);
  }
}
