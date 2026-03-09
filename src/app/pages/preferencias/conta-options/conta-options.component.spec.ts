import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { ContaOptionsComponent } from './conta-options.component';
import { AuthService } from '../../landing-page/modal-auth/service/auth.service';
import { ToastService } from '@services/toast-notification.service';
import { IPreferenciasOptions } from '../utils/preferencias-options';
import { UsuarioLogin } from '@models/user-model';

class AuthServiceMock {
  verificaSenha = jest.fn();
  updateUser = jest.fn();
}

class ToastServiceMock {
  toastSuccess = jest.fn();
  toastError = jest.fn();
}

describe('ContaOptionsComponent', () => {
  let component: ContaOptionsComponent;
  let fixture: ComponentFixture<ContaOptionsComponent>;
  let authService: AuthServiceMock;
  let toastService: ToastServiceMock;

  const mockComponentData: IPreferenciasOptions = {
    id: 2,
    navTitle: 'Conta',
    prefTitle: 'Preferências da conta',
    prefSubtitle: 'Altere os dados da sua conta',
    component: 'conta-options',
  };

  beforeEach(async () => {
    authService = new AuthServiceMock();
    toastService = new ToastServiceMock();

    await TestBed.configureTestingModule({
      imports: [ContaOptionsComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ToastService, useValue: toastService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ContaOptionsComponent);
    component = fixture.componentInstance;
    component.componentData = mockComponentData;

    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize without activating section when validPassword is not set', () => {
    fixture.detectChanges();

    expect(component.passwordConfirmed()).toBe(false);
    expect(component.isPassValid).toBe('');
  });

  it('should activate section on init when validPassword is true in localStorage', () => {
    localStorage.setItem('validPassword', 'true');

    fixture.detectChanges();

    expect(component.passwordConfirmed()).toBe(true);
  });

  it('should activate section when activateSection is called', () => {
    component.activateSection();

    expect(component.passwordConfirmed()).toBe(true);
  });

  it('should verify password successfully and activate section', () => {
    component.passConfirm = 'valid-password';
    authService.verificaSenha.mockReturnValue(of({ message: 'VALIDO' }));

    component.verificaSenha();

    expect(authService.verificaSenha).toHaveBeenCalledWith('valid-password');
    expect(component.passwordConfirmed()).toBe(true);
    expect(localStorage.getItem('validPassword')).toBe('true');
  });

  it('should not activate section when password verification fails', () => {
    component.passConfirm = 'invalid-password';
    authService.verificaSenha.mockReturnValue(of({ message: 'INVALIDO' }));

    component.verificaSenha();

    expect(authService.verificaSenha).toHaveBeenCalledWith('invalid-password');
    expect(component.passwordConfirmed()).toBe(false);
  });

  it('should handle error when password verification fails', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    component.passConfirm = 'test-password';
    authService.verificaSenha.mockReturnValue(throwError(() => new Error('Verification error')));

    component.verificaSenha();

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should update user successfully and reset userBody', () => {
    const userBody = new UsuarioLogin();
    userBody.email = 'test@example.com';
    component.userBody = userBody;

    authService.updateUser.mockReturnValue(of({ result: 'Dados atualizados com sucesso' }));

    component.updateUser();

    expect(authService.updateUser).toHaveBeenCalledWith(userBody);
    expect(toastService.toastSuccess).toHaveBeenCalledWith('Dados atualizados com sucesso');
    expect(component.userBody.email).toBe('');
  });

  it('should handle error when user update fails', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    authService.updateUser.mockReturnValue(throwError(() => new Error('Update error')));

    component.updateUser();

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should remove validPassword from localStorage on destroy', () => {
    localStorage.setItem('validPassword', 'true');

    component.ngOnDestroy();

    expect(localStorage.getItem('validPassword')).toBeNull();
  });
});
