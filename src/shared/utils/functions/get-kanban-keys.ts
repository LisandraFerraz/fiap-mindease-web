import { kanbanPriority, kanbanStatus } from '@models/interfaces-model';

export const GetKanbanPriority = (priority: keyof typeof kanbanPriority) => {
  const value = kanbanPriority[priority];

  const mapPriority = {
    [kanbanPriority.BAIXO]: 'baixo',
    [kanbanPriority.MEDIO]: 'médio',
    [kanbanPriority.ALTO]: 'alto',
  };

  return mapPriority[value];
};

export const GetKanbanStatus = (status: keyof typeof kanbanStatus) => {
  const value = kanbanStatus[status];

  const mapStatus = {
    [kanbanStatus.BACKLOG]: 'Backlog',
    [kanbanStatus.AFAZER]: 'A fazer',
    [kanbanStatus.ANDAMENTO]: 'Em andamento',
    [kanbanStatus.CONCLUIDO]: 'Concluído',
  };
  return mapStatus[value];
};
