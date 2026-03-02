export enum kanbanPriority {
  BAIXO = 'baixo',
  MEDIO = 'médio',
  ALTO = 'alto',
}

export interface IStickyNoteSizing {
  width: number;
  height: number;
}

export class PomodoroTodo {
  id: string = '';
  description: string = '';
  completed: boolean = false;
}

export interface IKanbanColumn {
  id: string;
  title: string;
  items: IKanbanTodo[];
  status: kanbanStatus;
}

export interface IKanbanColumns {
  backlog: IKanbanColumn;
  todo: IKanbanColumn;
  progress: IKanbanColumn;
  done: IKanbanColumn;
}

export class IKanbanTodo {
  id: string = '';
  title: string = '';
  status: kanbanStatus = 'AFAZER';
  priority: keyof typeof kanbanPriority = 'BAIXO';
  dueDate: Date;
  description: string = '';
  dayCountMessage: string;
}

export interface IStickyNotesResponse {
  stickyNotes: StickyNotesGroup[];
}
export class StickyNotesGroup {
  id: string = '';
  groupName: string = '';
  data: StickyNote[] = [];
}

export class StickyNote {
  id: string = '';
  description: string = '';
  title: string = '';
  color: stickyNoteColor = 'BLUE';
}

export interface IChecklistResponse {
  checklist: Checklist[];
}

export class Checklist {
  id: string;
  name: string;
  color: stickyNoteColor;
  data: ChecklistItem[];
}

export class ChecklistItem {
  id: string = '';
  description: string = '';
  completed: boolean = false;
  lastUpdated: Date;
}
