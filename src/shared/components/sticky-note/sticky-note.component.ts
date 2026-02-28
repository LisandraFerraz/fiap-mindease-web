import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StickyNote } from '@models/interfaces-model';

@Component({
  selector: 'sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss'],
})
export class StickyNoteComponent implements OnInit {
  @Input() noteContent: StickyNote;
  @Output() deleteNote = new EventEmitter<void>();
  @Output() updateNote = new EventEmitter<{ fieldName: string; fieldValue: string }>();

  handleEditNote(fieldName: string, event: Event) {
    const fieldValue = (event.target as HTMLInputElement).value;

    this.updateNote.emit({ fieldValue, fieldName });
  }

  handleDeleteNote() {
    this.deleteNote.emit();
  }

  constructor() {}

  ngOnInit() {}
}
