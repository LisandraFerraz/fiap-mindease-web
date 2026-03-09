import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsTemplateComponent } from './options-template.component';

describe('OptionsTemplateComponent', () => {
  let component: OptionsTemplateComponent;
  let fixture: ComponentFixture<OptionsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and subtitle inputs', () => {
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Title');
    expect(compiled.textContent).toContain('Test Subtitle');
  });
});
