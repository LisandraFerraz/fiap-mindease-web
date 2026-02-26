import { Type } from '@angular/core';
import { InterfaceOptionsComponent } from '../interface-options/interface-options.component';
import { ContaOptionsComponent } from '../conta-options/conta-options.component';

export enum ConfigTemplates {
  'interface-options',
  'conta-options',
}

export const TemplateSelectorMap: { [key: string]: Type<any> } = {
  'interface-options': InterfaceOptionsComponent,
  'conta-options': ContaOptionsComponent,
};
