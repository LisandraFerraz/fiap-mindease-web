import { IKanbanTodo, StickyNote } from './interfaces-model';

export interface IDashboardRes {
  graphData: IGraphData[];
  kanbanToExpire: IKanbanTodo[];
  favoriteStickyNotes: StickyNote[];
}

export interface IGraphData {
  left: number;
  right: number;
  leftBarLabel: string;
  rightBarLabel: string;
  midAxisLabel: string;
}
