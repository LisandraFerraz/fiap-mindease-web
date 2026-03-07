import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private readonly route = inject(Router);

  private readonly accessToken = sessionStorage.getItem('accessToken');

  canActivate(): boolean {
    return true;
    if (!this.accessToken) {
      this.route.navigateByUrl('/');
      false;
    }
  }
}
