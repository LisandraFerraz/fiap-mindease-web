import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
import { kanbanPriority, stickyNoteColor } from '@models/interfaces-model';

@Component({
  selector: 'color-selector',
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.scss',
})
export class ColorSelectorComponent {
  @Input() activeColor: stickyNoteColor;
  @Output() selectColor = new EventEmitter<string>();

  colors = ['BLUE', 'YELLOW', 'RED', 'GREEN', 'ORANGE'];

  prioValues = kanbanPriority;
  expanded = signal(false);

  constructor(private eRef: ElementRef) {}

  handleSetActiveColor() {
    this.expanded.update((isExpanded) => !isExpanded);
  }

  handleSelect(value: string) {
    this.selectColor.emit(value);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.expanded.update((isExpanded) => (isExpanded = false));
    }
  }
}
