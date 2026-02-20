import { Component } from '@angular/core';
import { ModalTemplateComponent } from '../../../shared/components/modal-template/modal-template.component';
import { MEInputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { UsuarioLogin, UsuarioRegister } from '../../../shared/models/model';
import { AuthService } from './auth.service';

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

  constructor(private authService: AuthService) {}

  changeLayout() {
    this.loginLayout = !this.loginLayout;
    console.log(this.loginLayout);
  }

  sendReq() {
    if (this.loginLayout) {
      this.authService.login(this.loginBody).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error('Erro ao realizar login :: ', err);
        },
      });
    } else {
      this.authService.register(this.registerBody).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error('Erro ao realizar cadastro :: ', err);
        },
      });
    }
  }
}
