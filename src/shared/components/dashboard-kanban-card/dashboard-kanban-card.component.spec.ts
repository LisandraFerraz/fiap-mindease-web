import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardKanbanCardComponent } from './dashboard-kanban-card.component';

describe('DashboardKanbanCardComponent', () => {
  let component: DashboardKanbanCardComponent;
  let fixture: ComponentFixture<DashboardKanbanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardKanbanCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardKanbanCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
