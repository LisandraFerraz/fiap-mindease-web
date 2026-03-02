export const endpoints = {
  user: '/user',
  register: '/user/register',
  login: '/auth/login',
  verificaSenha: '/auth/verifica-senha',

  pomodoro: '/tools/:id/pomodoro',
  addPomodoroTask: '/tools/:id/pomodoro/novo-pomodoro-todo',
  deletePomodoroTask: '/tools/:id/pomodoro/deleta-pomodoro-todo',
  atualizaPomodoroTask: '/tools/:id/pomodoro/atualiza-pomodoro-todo',

  kanban: '/tools/:id/kanban',
  addKanbanTask: '/tools/:id/kanban/novo-kanban-item',
  deleteKanbanTask: '/tools/:id/kanban/deleta-kanban-item',
  atualizaKanbanTask: '/tools/:id/kanban/atualiza-kanban-item',

  checklists: '/tools/:id/checklist',
  createChecklist: '/tools/:id/checklist/nova-checklist',
  atualizaChecklist: '/tools/:id/checklist/atualiza-checklist',
  deleteChecklist: '/tools/:id/checklist/deleta-checklist',

  stickyNotes: '/tools/:id/sticky-notes',
  createStickyNotesGroup: '/tools/:id/sticky-notes/novo-sticky-note-group',
  deleteStickyNotesGroup: '/tools/:id/sticky-notes/deleta-grupo-sticky-note',

  notifications: '/tools/:id/notifications',
  atualizaNotifications: '/tools/:id/notifications',
};
