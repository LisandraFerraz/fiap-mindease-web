import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeModeService {
  public readonly theme = signal<ThemeMode>(
    (localStorage.getItem('theme') as ThemeMode) ?? 'light-mode',
  );

  constructor() {
    effect(() => {
      localStorage.setItem('theme', this.theme());

      document.body.classList.remove('light-mode', 'dark-mode');
      document.body.classList.add(this.theme());
    });
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light-mode' ? 'dark-mode' : 'light-mode'));
  }
}
