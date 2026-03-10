import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FontSizeService {
  public readonly fontSize = signal<FontSizeMode>(
    (localStorage.getItem('fontSize') as FontSizeMode) ?? 'default-text',
  );

  constructor() {
    effect(() => {
      localStorage.setItem('fontSize', this.fontSize());

      document.documentElement.classList.remove('sm-text', 'lg-text', 'xl-text');

      if (this.fontSize() !== 'default-text') {
        document.documentElement.classList.add(this.fontSize());
      }
    });
  }

  setFontSize(size: FontSizeMode) {
    this.fontSize.set(size);
  }

  // resetFont() {
  //   this.fontSize.set('default-text');
  // }
}
