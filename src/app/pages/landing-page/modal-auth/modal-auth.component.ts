import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRegisterResponse, UsuarioLogin, UsuarioRegister } from '@models/user-model';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { isAuthFormValid, isEmailValid } from '@functions/validate-auth';
import { NotificationService } from '../../../notifications-modal/notifications.service';

@Component({
  imports: [CommonModule, ModalTemplateComponent, MEInputTextComponent],
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss'],
})
export class ModalAuthComponent {
  private readonly notificationsService = inject(NotificationService);

  loginLayout: boolean = true;

  registerBody: UsuarioRegister = new UsuarioRegister();
  confirmPass: string = '';

  loginBody: UsuarioLogin = {
    email: 'marianasilva@email.com',
    password: '12345678',
  };

  // TO-DO remover
  config = {
    positionClass: 'toast-bottom-center',
  };

  isAuthValid: boolean = false;

  constructor(
    private authService: AuthService,
    private toastNotif: ToastrService,
    private cd: ChangeDetectorRef,
  ) {}

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
      }
    } else {
      this.authService.register(this.registerBody).subscribe({
        next: (res: IRegisterResponse) => {
          this.toastNotif.success(res.message, '', this.config);
          this.setupNotificationsNumber();

          this.changeLayout();
          this.cd.detectChanges();
        },
        error: (err) => {
          this.toastNotif.error('Erro ao cadastrar usuário', '', this.config);
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
