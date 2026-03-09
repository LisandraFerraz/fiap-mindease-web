import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  IaccessTokens,
  IRegisterResponse,
  UsuarioLogin,
  UsuarioRegister,
} from '@models/user-model';
import { endpoints } from '@core/env/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private toastNotif: ToastrService,
  ) {}

  login(data: UsuarioLogin) {
    return this.http.post<IaccessTokens>(`${endpoints.login}`, data).subscribe({
      next: (res: IaccessTokens) => {
        if (res.accessToken) {
          sessionStorage.setItem('accessToken', res.accessToken);
          sessionStorage.setItem('platToolsId', res.platToolsId);
          sessionStorage.setItem('usuarioId', res.usuarioId);
          sessionStorage.setItem('usuarioNome', res.userName);

          this.router.navigateByUrl('dashboard');
          this.dialog.closeAll();
        }
      },
      error: (err) => {
        this.toastNotif.error('Erro ao autenticar usuário', '', {
          positionClass: 'toast-bottom-center',
        });
      },
    });
  }

  register(data: UsuarioRegister) {
    return this.http.post<IRegisterResponse>(`${endpoints.register}`, data);
  }

  verificaSenha(pass: string) {
    const userId = sessionStorage.getItem('usuarioId');
    const passBody = {
      password: pass,
      usuarioId: userId,
    };
    return this.http.post<{ result: string }>(`${endpoints.verificaSenha}`, passBody);
  }

  updateUser(data: Partial<UsuarioLogin>) {
    const userid = sessionStorage.getItem('usuarioId');
    return this.http.patch<{ result: string }>(`${endpoints.user}/${userid}`, data);
  }
}
