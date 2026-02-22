export class UsuarioRegister {
  nome: string = '';
  email: string = '';
  password: string = '';
}

export class UsuarioLogin {
  email: string = '';
  password: string = '';
}

export interface IaccessTokens {
  accessToken: string;
  platToolsId: string;
  usuarioId: string;
}

export interface IRegisterResponse {
  message: string;
}
