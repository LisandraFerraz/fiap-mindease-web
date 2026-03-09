import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRegisterResponse, UsuarioLogin, UsuarioRegister } from '@models/user-model';
import { AuthService } from './service/auth.service';
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { isAuthFormValid, isEmailValid } from '@functions/validate-auth';
import { NotificationService } from '../../../notifications-modal/notifications.service';
import { ToastService } from '@services/toast-notification.service';

@Component({
  imports: [CommonModule, ModalTemplateComponent, MEInputTextComponent],
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss'],
})
export class ModalAuthComponent {
  private readonly notificationsService = inject(NotificationService);
  private readonly toast = inject(ToastService);
  private readonly authService = inject(AuthService);
  private readonly cd = inject(ChangeDetectorRef);

  loginLayout: boolean = true;

  registerBody: UsuarioRegister = new UsuarioRegister();
  confirmPass: string = '';

  loginBody: UsuarioLogin;
  isAuthValid: boolean = false;

  changeLayout() {
    this.loginLayout = !this.loginLayout;
  }

  checkValidation() {
    const activeForm = this.loginLayout ? this.loginBody : this.registerBody;

    const isAuthValid = isAuthFormValid(activeForm);
    this.isAuthValid = isAuthValid;
  }

  checkEmailValid(email: string) {
    return isEmailValid(email);
  }

  sendReq() {
    if (this.loginLayout) {
      if (this.isAuthValid) {
        this.authService.login(this.loginBody);
      } else {
        this.toast.toastError('Credenciais inválidas.');
      }
    } else {
      this.authService.register(this.registerBody).subscribe({
        next: (res: IRegisterResponse) => {
          this.toast.toastSuccess(res.message);
          this.setupNotificationsNumber();

          this.changeLayout();
          this.cd.detectChanges();
        },
        error: (err) => {
          this.toast.toastError('Erro ao cadastrar usuário');
        },
      });
    }
  }

  private setupNotificationsNumber() {
    this.notificationsService.getAllNotifications().subscribe({
      next: (res) => {
        const arraysLen = res.checklistNotificacoes.length + res.kanbanNotificacoes.length;
        this.notificationsService.setNotifNumber(arraysLen);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
