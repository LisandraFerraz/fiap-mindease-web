import { Component, Input } from '@angular/core';

@Component({
  selector: 'options-template',
  templateUrl: './options-template.component.html',
  styleUrl: './options-template.component.scss',
})
export class OptionsTemplateComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
