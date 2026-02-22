export const endpoints = {
  register: '/user/register',
  login: '/auth/login',

  checklist: '/tools/:id/checklist',
  stickyNotes: '/tools/:id/sticky-note',

  pomodoro: '/tools/:id/pomodoro',
  addPomodoroTask: '/tools/:id/pomodoro/novo-pomodoro-todo',
  deletePomodoroTask: '/tools/:id/pomodoro/deleta-pomodoro-todo',
  atualizaPomodoroTask: '/tools/:id/pomodoro/atualiza-pomodoro-todo',

  kanban: '/tools/:id/kanban',
  addKanbanTask: '/tools/:id/kanban/novo-kanban-todo',
  deleteKanbanTask: '/tools/:id/kanban/deleta-kanban-item',
  atualizaKanbanTask: '/tools/:id/kanban/atualiza-kanban-item',
};
