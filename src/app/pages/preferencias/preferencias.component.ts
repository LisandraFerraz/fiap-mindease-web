import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { IPreferenciasOptions, PreferenciasOptions } from './utils/preferencias-options';
import { ConfigTemplates, TemplateSelectorMap } from './utils/template-selector-map';

@Component({
  selector: 'app-preferencias.component',
  imports: [MatSlideToggleModule, Sidenav],
  templateUrl: './preferencias.component.html',
  styleUrl: './preferencias.component.scss',
})
export class PreferenciasComponent implements OnInit, OnDestroy {
  @ViewChild('config_template_selected', { read: ViewContainerRef, static: true })
  configTemplate: ViewContainerRef;

  readonly preferenciasConteudo: IPreferenciasOptions[] = PreferenciasOptions;

  activeTemplate: keyof typeof ConfigTemplates = 'interface-options';

  ngOnInit(): void {
    this.selectConfigTemplate(this.activeTemplate, this.preferenciasConteudo[1]);
  }

  selectConfigTemplate(templateKey: keyof typeof ConfigTemplates, data?: IPreferenciasOptions) {
    if (this.configTemplate.length) this.configTemplate.clear();

    const findTemplate = TemplateSelectorMap[templateKey];

    if (findTemplate) {
      this.activeTemplate = templateKey;
      const component = this.configTemplate.createComponent(findTemplate);
      component.setInput('componentData', data);
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('validPassword');
  }
}
