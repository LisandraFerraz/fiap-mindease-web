import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'me-modal',
  imports: [MatDialogModule, DefaultButtonComponent, MatIcon],
  templateUrl: './modal-template.component.html',
  styleUrl: './modal-template.component.scss',
})
export class ModalTemplateComponent {
  constructor(private modal: MatDialog) {}

  @Input() disabled: boolean = false;
  @Input() showBottom: boolean = true;

  @Output() closeEvent = new EventEmitter<void>();
  @Output() clickConfirm = new EventEmitter<void>();

  close() {
    this.modal.closeAll();
  }

  onConfirm() {
    this.clickConfirm.emit();
  }
}
