import { AuthService } from '../../landing-page/modal-auth/service/auth.service';
import { IPreferenciasOptions } from './../utils/preferencias-options';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  signal,
  OnDestroy,
} from '@angular/core';
import { OptionsTemplateComponent } from '../options-template/options-template.component';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { DefaultButtonComponent } from '@components/default-button/default-button.component';
import { UsuarioLogin } from '@models/user-model';
import { ToastService } from '@services/toast-notification.service';

@Component({
  selector: 'conta-options',
  imports: [OptionsTemplateComponent, MEInputTextComponent, DefaultButtonComponent],
  templateUrl: './conta-options.component.html',
  styleUrl: './conta-options.component.scss',
})
export class ContaOptionsComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly cd = inject(ChangeDetectorRef);

  @Input() componentData: IPreferenciasOptions;

  passwordConfirmed = signal(false);
  passConfirm: string = '';
  userBody = new UsuarioLogin();
  isPassValid = '';

  ngOnInit(): void {
    this.isPassValid = localStorage.getItem('validPassword') || '';
    if (this.isPassValid == 'true') this.activateSection();
  }

  activateSection() {
    this.passwordConfirmed.update((p) => (p = true));
  }

  verificaSenha() {
    this.authService.verificaSenha(this.passConfirm).subscribe({
      next: (res: { message: string }) => {
        const isValid = res.message === 'VALIDO';
        this.passwordConfirmed.update(() => isValid);

        if (!this.isPassValid) localStorage.setItem('validPassword', 'true');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateUser() {
    this.authService.updateUser(this.userBody).subscribe({
      next: (res) => {
        this.toast.toastSuccess(res.result);
        this.userBody = new UsuarioLogin();

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('validPassword');
  }
}
