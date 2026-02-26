import { Component, Input } from '@angular/core';
import { OptionsTemplateComponent } from '../options-template/options-template.component';
import { IPreferenciasOptions } from '../utils/preferencias-options';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'interface-options',
  imports: [OptionsTemplateComponent, MatSlideToggleModule],
  templateUrl: './interface-options.component.html',
  styleUrl: './interface-options.component.scss',
})
export class InterfaceOptionsComponent {
  @Input() componentData: IPreferenciasOptions;

  ngOnInit(): void {
    console.log(this.componentData);
  }
}
