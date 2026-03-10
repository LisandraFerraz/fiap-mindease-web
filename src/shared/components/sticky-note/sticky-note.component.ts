import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { StickyNote } from '@models/interfaces-model';

@Component({
  selector: 'sticky-note',
  imports: [FormsModule, MatIcon],
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss'],
})
export class StickyNoteComponent implements OnInit {
  @ViewChild('checkresize') divResizable: ElementRef<HTMLDivElement>;

  @Input() isLittleContent: boolean = false;
  @Input() noteContent: StickyNote;
  @Output() deleteNote = new EventEmitter<void>();
  @Output() updateNote = new EventEmitter<{
    fieldName: string;
    fieldValue: any;
  }>();

  title: string;
  description: string;
  resizeObserver: ResizeObserver;

  ngOnInit() {
    this.title = this.noteContent.title;
    this.description = this.noteContent.description;
  }

  handleEditNote(fieldName: keyof StickyNote, event: Event) {
    let fieldValue = fieldName !== 'isFavorite' ? (event.target as HTMLInputElement).value : event;

    if (fieldValue === '') {
      fieldValue = fieldName === 'title' ? this.title : this.description;
    }

    this.updateNote.emit({ fieldValue, fieldName });
  }

  handleToggleFavorite() {
    const fieldName = 'isFavorite';
    const fieldValue = !this.noteContent.isFavorite;

    this.updateNote.emit({ fieldValue, fieldName });
  }

  handleDeleteNote() {
    this.deleteNote.emit();
  }
}
