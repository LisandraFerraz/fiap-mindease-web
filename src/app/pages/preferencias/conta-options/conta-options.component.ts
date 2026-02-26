import { AuthService } from './../../landing-page/modal-auth/auth.service';
import { IPreferenciasOptions } from './../utils/preferencias-options';
import { Component, inject, Input, signal } from '@angular/core';
import { OptionsTemplateComponent } from '../options-template/options-template.component';
import { MEInputTextComponent } from '@components/input-text/input-text.component';
import { DefaultButtonComponent } from '@components/default-button/default-button.component';

@Component({
  selector: 'conta-options',
  imports: [OptionsTemplateComponent, MEInputTextComponent, DefaultButtonComponent],
  templateUrl: './conta-options.component.html',
  styleUrl: './conta-options.component.scss',
})
export class ContaOptionsComponent {
  private readonly authService = inject(AuthService);

  @Input() componentData: IPreferenciasOptions;

  passwordConfirmed = signal(false);

  passConfirm: string = '';

  activateSection() {
    this.passwordConfirmed.update((p) => (p = true));
  }

  verificaSenha() {
    this.authService.verificaSenha(this.passConfirm).subscribe({
      next: (res: { result: string }) => {
        console.log(res);

        const isValid = res.result === 'VALIDO';
        this.passwordConfirmed.update(() => isValid);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
