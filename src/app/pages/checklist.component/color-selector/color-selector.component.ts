import { Component, EventEmitter, Output } from '@angular/core';
import { kanbanPriority } from '@models/interfaces-model';

@Component({
  selector: 'color-selector',
  imports: [],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.scss',
})
export class ColorSelectorComponent {
  @Output() selectColor = new EventEmitter<string>();

  colors = ['BLUE', 'YELLOW', 'RED', 'GREEN', 'ORANGE'];

  prioValues = kanbanPriority;

  handleSelect(value: string) {
    this.selectColor.emit(value);

    console.log(value);
  }
}
