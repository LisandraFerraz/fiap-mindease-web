import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getMinDate } from '../../../app/pages/kanban/modal-kanban-item/modal-kanban-item.component/utils/format-date';

@Component({
  selector: 'me-input-text',
  imports: [FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class MEInputTextComponent implements OnInit {
  @Input() type: 'text' | 'password' | 'date' = 'text';
  @Input() value: string = '';
  @Input() label = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() minDate = '';
  @Output() changeEvent = new EventEmitter<string>();

  ngOnInit(): void {
    if (this.type === 'date') {
      document.getElementById('vencimento')!.setAttribute('min', getMinDate());
    }
  }

  handleChange(event: Event) {
    const fieldValue = (event.target as HTMLInputElement).value;
    this.changeEvent.emit(fieldValue);
  }
}
