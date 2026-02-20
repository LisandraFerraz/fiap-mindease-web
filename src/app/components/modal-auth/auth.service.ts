import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin, UsuarioRegister } from '../../../shared/models/model';
import { endpoints } from '../../../core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: UsuarioLogin) {
    return this.http.post(`${endpoints.login}`, data);
  }

  register(data: UsuarioRegister) {
    return this.http.post(`${endpoints.register}`, data);
  }
}
