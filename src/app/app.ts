import { ThemeModeService } from '@services/theme-service/theme-mode.service';
import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontSizeService } from '@services/theme-service/font-sizing.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(
    private fontSizeService: FontSizeService,
    private themeModeService: ThemeModeService,
  ) {}
  ngOnInit(): void {}
  protected readonly title = signal('Mindease');
}
