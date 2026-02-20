import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalTemplateComponent } from '../../../shared/components/modal-template/modal-template.component';
import { MEInputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { UsuarioLogin, UsuarioRegister } from '../../../shared/models/model';
import { AuthService } from './auth.service';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { ToastNotification } from '../../../shared/services/toast-notification.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  imports: [CommonModule, ModalTemplateComponent, MEInputTextComponent],
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss'],
})
export class ModalAuthComponent {
  loginLayout: boolean = true;

  registerBody: UsuarioRegister = new UsuarioRegister();
  confirmPass: string = '';

  loginBody: UsuarioLogin = new UsuarioLogin();

  // TO-DO remover
  config = {
    positionClass: 'toast-bottom-center',
  };

  constructor(
    private authService: AuthService,
    private toastNotif: ToastrService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  changeLayout() {
    this.loginLayout = !this.loginLayout;
    console.log(this.loginLayout);
  }

  sendReq() {
    if (this.loginLayout) {
      this.authService.login(this.loginBody).subscribe({
        next: (res: any) => {
          if (res.access_token) {
            this.dialog.closeAll();
            this.router.navigateByUrl('pomodoro');
          }
        },
        error: (err) => {
          this.toastNotif.error('Erro ao autenticar usuário', '', this.config);
        },
      });
    } else {
      this.authService.register(this.registerBody).subscribe({
        next: (res) => {
          this.toastNotif.success('Cadastro feito com sucesso', '', this.config);

          this.changeLayout();
          this.cd.detectChanges();
        },
        error: (err) => {
          this.toastNotif.error('Erro ao cadastrar usuário', '', this.config);
        },
      });
    }
  }
}
