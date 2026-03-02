export interface INotification {
  id: string;
  read: boolean;
  route: string;
  title: string;
  description: string;
  alertType: AlertType;
}

export interface INotifResponse {
  kanbanNotificacoes: INotification[];
  checklistNotificacoes: INotification[];
}
