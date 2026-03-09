import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { of, throwError } from 'rxjs';

import { ModalAuthComponent } from './modal-auth.component';
import { AuthService } from './service/auth.service';
import { NotificationService } from '../../../notifications-modal/notifications.service';
import { ToastService } from '@services/toast-notification/toast-notification.service';
import { IRegisterResponse, UsuarioLogin, UsuarioRegister } from '@models/user-model';

class AuthServiceMock {
  login = jest.fn();
  register = jest.fn();
}

class NotificationServiceMock {
  getAllNotifications = jest.fn();
  setNotifNumber = jest.fn();
}

class ToastServiceMock {
  toastError = jest.fn();
  toastSuccess = jest.fn();
}

describe('ModalAuthComponent', () => {
  let component: ModalAuthComponent;
  let fixture: ComponentFixture<ModalAuthComponent>;
  let authService: AuthServiceMock;
  let notificationsService: NotificationServiceMock;
  let toastService: ToastServiceMock;

  beforeEach(async () => {
    authService = new AuthServiceMock();
    notificationsService = new NotificationServiceMock();
    toastService = new ToastServiceMock();

    await TestBed.configureTestingModule({
      imports: [ModalAuthComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: NotificationService, useValue: notificationsService },
        { provide: ToastService, useValue: toastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAuthComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch layout when changeLayout is called', () => {
    component.loginLayout = true;
    component.changeLayout();
    expect(component.loginLayout).toBe(false);
    component.changeLayout();
    expect(component.loginLayout).toBe(true);
  });

  it('should validate login form using isAuthFormValid', () => {
    component.loginBody = { email: 'test@test.com', password: '123456' } as UsuarioLogin;
    component.loginLayout = true;

    component.checkValidation();

    expect(component.isAuthValid).toBe(true);
  });

  it('should call authService.login when sendReq is called with valid login', () => {
    component.loginLayout = true;
    component.isAuthValid = true;
    component.loginBody = { email: 'test@test.com', password: '123456' } as UsuarioLogin;

    component.sendReq();

    expect(authService.login).toHaveBeenCalledWith(component.loginBody);
  });

  it('should show error toast when login is invalid', () => {
    component.loginLayout = true;
    component.isAuthValid = false;

    component.sendReq();

    expect(toastService.toastError).toHaveBeenCalledWith('Credenciais inválidas.');
  });

  it('should register user and handle success flow', () => {
    component.loginLayout = false;
    component.registerBody = { email: 'a@a.com', password: '123', nome: 'User' } as UsuarioRegister;

    const response: IRegisterResponse = { message: 'ok' } as any;

    (authService.register as jest.Mock).mockReturnValue(of(response));
    (notificationsService.getAllNotifications as jest.Mock).mockReturnValue(
      of({ checklistNotificacoes: [], kanbanNotificacoes: [] } as any),
    );

    const cd = (component as any).cd;
    jest.spyOn(cd, 'detectChanges');

    component.sendReq();

    expect(toastService.toastSuccess).toHaveBeenCalledWith('ok');
    expect(notificationsService.setNotifNumber).toHaveBeenCalledWith(0);
    expect(component.loginLayout).toBe(true);
    expect(cd.detectChanges).toHaveBeenCalled();
  });

  it('should show toast error when register fails', () => {
    component.loginLayout = false;
    component.registerBody = { email: 'a@a.com', password: '123', nome: 'User' } as UsuarioRegister;

    (authService.register as jest.Mock).mockReturnValue(throwError(() => new Error('fail')));

    component.sendReq();

    expect(toastService.toastError).toHaveBeenCalledWith('Erro ao cadastrar usuário');
  });
});
