import { Component, inject, signal } from '@angular/core';
import { FontSizeService } from '@services/theme-service/font-sizing.service';

@Component({
  selector: 'font-size-selector',
  imports: [],
  templateUrl: './font-size-selector.component.html',
  styleUrl: './font-size-selector.component.scss',
})
export class FontSizeSelectorComponent {
  private readonly fontSizeService = inject(FontSizeService);

  fontsizeOpts: { size: FontSizeMode; label: string }[] = [
    {
      size: 'sm-text',
      label: 'Pequeno',
    },
    {
      size: 'default-text',
      label: 'Padrão',
    },
    {
      size: 'lg-text',
      label: 'Grande',
    },
    {
      size: 'xl-text',
      label: 'EXTRA G',
    },
  ];

  sizeSelected = signal(localStorage.getItem('fontSize'));

  handleToggleFontSize(size: FontSizeMode) {
    this.fontSizeService.setFontSize(size);
    this.sizeSelected.update(() => size);
  }
}
