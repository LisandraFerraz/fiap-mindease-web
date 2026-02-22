type kanbanStatus = 'PENDENTE' | 'AFAZER' | 'ANDAMENTO' | 'CONCLUIDO';
type stickyNoteColor = 'BLUE' | 'YELLOW' | 'RED' | 'GREEN';

export class PomodoroTodo {
  id: string = '';
  description: string = '';
  completed: boolean = false;
}

export interface IKanbanTodo {
  id: string;
  title: string;
  status: kanbanStatus;
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
