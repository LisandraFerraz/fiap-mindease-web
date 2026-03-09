import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';

import { InterfaceOptionsComponent } from './interface-options.component';
import { ThemeModeService } from '@services/theme-service/theme-mode.service';
import { IPreferenciasOptions } from '../utils/preferencias-options';

class ThemeModeServiceMock {
  theme = signal('light');
  toggleTheme = jest.fn();
}

describe('InterfaceOptionsComponent', () => {
  let component: InterfaceOptionsComponent;
  let fixture: ComponentFixture<InterfaceOptionsComponent>;
  let themeModeService: ThemeModeServiceMock;

  const mockComponentData: IPreferenciasOptions = {
    id: 1,
    navTitle: 'Interface',
    prefTitle: 'Preferências da interface',
    prefSubtitle: 'Configure a interface conforme sua necessidade',
    component: 'interface-options',
  };

  beforeEach(async () => {
    themeModeService = new ThemeModeServiceMock();

    await TestBed.configureTestingModule({
      imports: [InterfaceOptionsComponent],
      providers: [{ provide: ThemeModeService, useValue: themeModeService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InterfaceOptionsComponent);
    component = fixture.componentInstance;
    component.componentData = mockComponentData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentTheme from ThemeModeService', () => {
    expect(component.currentTheme).toBe('light');
  });

  it('should call toggleTheme on ThemeModeService when changeTheme is called', () => {
    component.changeTheme();

    expect(themeModeService.toggleTheme).toHaveBeenCalled();
  });

  it('should receive componentData input', () => {
    expect(component.componentData).toEqual(mockComponentData);
  });
});
