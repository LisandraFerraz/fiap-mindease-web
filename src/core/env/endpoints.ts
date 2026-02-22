export const endpoints = {
  register: '/user/register',
  login: '/auth/login',

  checklist: '/tools/:id/checklist',
  stickyNotes: '/tools/:id/sticky-note',
  kanban: '/tools/:id/kanban',

  pomodoro: '/tools/:id/pomodoro',
  addPomodoroTask: '/tools/:id/pomodoro/novo-pomodoro-todo',
  deletePomodoroTask: '/tools/:id/pomodoro/deleta-pomodoro-todo',
  atualizaPomodoroTask: '/tools/:id/pomodoro/atualiza-pomodoro-todo',
};
