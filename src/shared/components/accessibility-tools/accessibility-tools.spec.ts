import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityTools } from './accessibility-tools';

describe('AccessibilityTools', () => {
  let component: AccessibilityTools;
  let fixture: ComponentFixture<AccessibilityTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessibilityTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibilityTools);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
