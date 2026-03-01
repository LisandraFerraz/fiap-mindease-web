import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputTemplateComponent } from '@components/input-template/input-template.component';

@Component({
  selector: 'input-date-picker',
  imports: [
    FormsModule,
    InputTemplateComponent,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './input-date-picker.component.html',
  styleUrl: './input-date-picker.component.scss',
})
export class InputDatePickerComponent {
  @Input() label = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() value: Date;
  @Input() disabled: boolean = false;
  @Input() class: string[] = [''];
  @Input() errorMsg: string = '';
  @Input() required: boolean;
  @Output() valueChange = new EventEmitter<Date>();

  minDate = new Date();
  date: Date;

  handleChange() {
    console.log(this.date);
    this.value = this.date;
    this.valueChange.emit(this.date);
  }
}
