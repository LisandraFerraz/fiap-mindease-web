import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultButtonComponent } from '@components/default-button/default-button.component';

@Component({
  selector: 'app-not-found',
  imports: [DefaultButtonComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  private readonly accessToken = sessionStorage.getItem('accessToken') || '';
  private readonly router = inject(Router);

  redirect() {
    if (this.accessToken !== '') this.router.navigateByUrl('/dashboard');
    else this.router.navigateByUrl('');
  }
}
