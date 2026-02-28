import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'me-button',
  imports: [CommonModule],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.scss',
})
export class DefaultButtonComponent {
  @Input() label = '';
  @Input() customClass = '';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }

  get classes() {
    return [
      'button',
      `${this.customClass}`,
      this.color === 'primary' ? 'primary-btn' : 'secondary-btn',
    ];
  }
}
