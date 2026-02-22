export type kanbanStatus = 'BACKLOG' | 'AFAZER' | 'ANDAMENTO' | 'CONCLUIDO';
export type stickyNoteColor = 'BLUE' | 'YELLOW' | 'RED' | 'GREEN';

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
  id: number;
  title: string;
  items: IKanbanTodo[];
  status: kanbanStatus;
}

export interface IKanbanTodo {
  id: string;
  title: string;
  status: kanbanStatus;
  priority: keyof typeof kanbanPriority;
  dueDate: string;
  description: string;
}

export interface IStickyNote {
  id: string;
  description: string;
  createdAt: string;
  color: stickyNoteColor;
}

export interface IChecklist {
  id: string;
  name: string;
  data: IChecklistItem[];
}

export interface IChecklistItem {
  id: string;
  description: string;
  completed: boolean;
}
