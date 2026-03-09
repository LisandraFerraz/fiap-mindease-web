import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { endpoints } from '@core/env/endpoints';
import { IaccessTokens, UsuarioLogin, UsuarioRegister } from '@models/user-model';

class RouterMock {
  navigateByUrl = jest.fn();
}

class MatDialogMock {
  closeAll = jest.fn();
}

class ToastrServiceMock {
  error = jest.fn();
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: RouterMock;
  let dialog: MatDialogMock;
  let toast: ToastrServiceMock;

  beforeEach(() => {
    router = new RouterMock();
    dialog = new MatDialogMock();
    toast = new ToastrServiceMock();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog },
        { provide: ToastrService, useValue: toast },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store tokens when response contains accessToken', () => {
    const payload: UsuarioLogin = { email: 'a@a.com', password: '123' } as any;
    const response: IaccessTokens = {
      accessToken: 'tok',
      platToolsId: 'pt',
      usuarioId: 'uid',
      userName: 'user',
    } as any;

    service.login(payload);

    const req = httpMock.expectOne(endpoints.login);
    expect(req.request.method).toBe('POST');
    req.flush(response);

    expect(sessionStorage.getItem('accessToken')).toBe('tok');
    expect(sessionStorage.getItem('usuarioId')).toBe('uid');
    expect(router.navigateByUrl).toHaveBeenCalledWith('dashboard');
    expect(dialog.closeAll).toHaveBeenCalled();
  });

  it('should show toast on login error', () => {
    const payload: UsuarioLogin = { email: 'a@a.com', password: '123' } as any;

    service.login(payload);

    const req = httpMock.expectOne(endpoints.login);
    req.error(new ErrorEvent('fail'));

    expect(toast.error).toHaveBeenCalledWith('Erro ao autenticar usuário', '', {
      positionClass: 'toast-bottom-center',
    });
  });

  it('should register a user', (done) => {
    const payload: UsuarioRegister = { email: 'a@a.com', password: '123', name: 'User' } as any;
    const response = { id: '1' } as any;

    service.register(payload).subscribe((res) => {
      expect(res).toEqual(response);
      done();
    });

    const req = httpMock.expectOne(endpoints.register);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should verify password', (done) => {
    sessionStorage.setItem('usuarioId', 'uid');
    const response = { message: 'ok' } as any;

    service.verificaSenha('123').subscribe((res) => {
      expect(res).toEqual(response);
      done();
    });

    const req = httpMock.expectOne(endpoints.verificaSenha);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ password: '123', usuarioId: 'uid' });
    req.flush(response);
  });

  it('should update user', (done) => {
    sessionStorage.setItem('usuarioId', 'uid');
    const response = { result: 'ok' } as any;

    service.updateUser({ email: 'new@e.com' }).subscribe((res) => {
      expect(res).toEqual(response);
      done();
    });

    const req = httpMock.expectOne(`${endpoints.user}/uid`);
    expect(req.request.method).toBe('PATCH');
    req.flush(response);
  });
});
