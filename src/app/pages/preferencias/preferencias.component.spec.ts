import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTemplates, TemplateSelectorMap } from './utils/template-selector-map';
import { PreferenciasComponent } from './preferencias.component';
import { IPreferenciasOptions, PreferenciasOptions } from './utils/preferencias-options';

@Component({ selector: 'sidenav', template: '<ng-content></ng-content>' })
class StubSidenavComponent {}

@Component({ selector: 'app-preferencias-dummy', template: '' })
class DummyTemplateComponent {}

describe('PreferenciasComponent', () => {
  let component: PreferenciasComponent;
  let fixture: ComponentFixture<PreferenciasComponent>;

  const originalMap = { ...TemplateSelectorMap };
  const viewContainerRefStub = {
    length: 1,
    clear: jest.fn(),
    createComponent: jest.fn().mockReturnValue({
      setInput: jest.fn(),
    }),
  } as any;

  beforeAll(() => {
    TemplateSelectorMap['interface-options'] = DummyTemplateComponent;
    TemplateSelectorMap['conta-options'] = DummyTemplateComponent;
  });

  afterAll(() => {
    Object.assign(TemplateSelectorMap, originalMap);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenciasComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PreferenciasComponent, {
        set: {
          imports: [StubSidenavComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PreferenciasComponent);
    component = fixture.componentInstance;

    component.configTemplate = viewContainerRefStub;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize with interface-options and set component input', () => {
    fixture.detectChanges();

    expect(component.activeTemplate).toBe('interface-options');
    expect(viewContainerRefStub.clear).toHaveBeenCalled();
    expect(viewContainerRefStub.createComponent).toHaveBeenCalledWith(DummyTemplateComponent);

    const expectedData = PreferenciasOptions[1];
    expect(viewContainerRefStub.createComponent().setInput).toHaveBeenCalledWith(
      'componentData',
      expectedData,
    );
  });

  it('should change template and pass data to component instance', () => {
    const templateKey: keyof typeof ConfigTemplates = 'conta-options';
    const data: IPreferenciasOptions = PreferenciasOptions[0];

    component.selectConfigTemplate(templateKey, data);

    expect(component.activeTemplate).toBe(templateKey);
    expect(viewContainerRefStub.clear).toHaveBeenCalled();
    expect(viewContainerRefStub.createComponent).toHaveBeenCalledWith(DummyTemplateComponent);
    expect(viewContainerRefStub.createComponent().setInput).toHaveBeenCalledWith(
      'componentData',
      data,
    );
  });

  it('should remove validPassword from sessionStorage on destroy', () => {
    sessionStorage.setItem('validPassword', 'true');

    component.ngOnDestroy();

    expect(sessionStorage.getItem('validPassword')).toBeNull();
  });
});
