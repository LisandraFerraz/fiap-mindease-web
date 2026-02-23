import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRegisterResponse, UsuarioLogin, UsuarioRegister } from '@models/user-model';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { MEInputTextComponent } from '@components/input-text/input-text.component';

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
    private cd: ChangeDetectorRef,
  ) {}

  changeLayout() {
    this.loginLayout = !this.loginLayout;
  }

  sendReq() {
    if (this.loginLayout) {
      this.authService.login(this.loginBody);
    } else {
      this.authService.register(this.registerBody).subscribe({
        next: (res: IRegisterResponse) => {
          this.toastNotif.success(res.message, '', this.config);

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
