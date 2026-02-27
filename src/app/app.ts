import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeModeService } from '@services/theme-service/theme-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  themeMode = inject(ThemeModeService);

  ngOnInit(): void {
    // this.themeMode.theme();
  }

  protected readonly title = signal('fiap-mindease-web');
}
