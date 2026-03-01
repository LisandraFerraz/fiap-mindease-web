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
import { StickyNote } from '@models/interfaces-model';

@Component({
  selector: 'sticky-note',
  imports: [FormsModule],
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss'],
})
export class StickyNoteComponent implements OnInit {
  @ViewChild('checkresize') divResizable: ElementRef<HTMLDivElement>;

  @Input() noteContent: StickyNote;
  @Output() deleteNote = new EventEmitter<void>();
  @Output() updateNote = new EventEmitter<{
    fieldName: string;
    fieldValue: string;
  }>();

  title: string;
  description: string;
  resizeObserver: ResizeObserver;

  ngOnInit() {
    this.title = this.noteContent.title;
    this.description = this.noteContent.description;
  }

  handleEditNote(fieldName: string, event: Event) {
    let fieldValue = (event.target as HTMLInputElement).value;

    if (fieldValue === '') {
      fieldValue = fieldName === 'title' ? this.title : this.description;
    }

    this.updateNote.emit({ fieldValue, fieldName });
  }

  handleDeleteNote() {
    this.deleteNote.emit();
  }
}
