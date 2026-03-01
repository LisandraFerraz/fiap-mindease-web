import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-template',
  imports: [],
  templateUrl: './input-template.component.html',
  styleUrl: './input-template.component.scss',
})
export class InputTemplateComponent {
  @Input() label = '';
  @Input() inputId = '';
  @Input() errorMsg: string = '';
  @Input() required: boolean;
}
