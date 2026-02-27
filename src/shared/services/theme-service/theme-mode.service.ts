import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeModeService {
  public readonly theme = signal<ThemeMode>(localStorage.getItem('theme') as ThemeMode);

  constructor() {
    effect(() => {
      localStorage.setItem('theme', this.theme());
      document.body.className = this.theme();
    });
  }

  setTheme() {
    this.theme.update((t) => (t === 'light-mode' ? 'dark-mode' : 'light-mode'));
  }
}
