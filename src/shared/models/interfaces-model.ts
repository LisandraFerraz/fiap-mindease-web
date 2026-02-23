export type kanbanStatus = 'BACKLOG' | 'AFAZER' | 'ANDAMENTO' | 'CONCLUIDO';
export type stickyNoteColor = 'BLUE' | 'YELLOW' | 'RED' | 'GREEN' | 'ORANGE';

export enum kanbanPriority {
  BAIXO = 'baixo',
  MEDIO = 'médio',
  ALTO = 'alto',
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
  dueDate: string = '';
  description: string = '';
}

export interface IStickyNote {
  id: string;
  description: string;
  createdAt: string;
  color: stickyNoteColor;
}

export interface IChecklistResponse {
  checklist: Checklist[];
}

export class Checklist {
  id: string;
  name: string;
  color: stickyNoteColor;
  data: IChecklistItem[];
}

export interface IChecklistItem {
  id: string;
  description: string;
  completed: boolean;
}
