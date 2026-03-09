import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import * as Highcharts from 'highcharts';
import { HighchartsChartComponent, provideHighcharts } from 'highcharts-angular';
import { DashboardKanbanCardComponent } from '@components/dashboard-kanban-card/dashboard-kanban-card.component';
import { StickyNoteComponent } from '@components/sticky-note/sticky-note.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './service/dashboard.service';
import { IDashboardRes } from '@models/dashboard-model';

@Component({ selector: 'sidenav', template: '<ng-content></ng-content>' })
class StubSidenavComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let listPomodoroTasksSpy: any;
  let mockResponse: IDashboardRes;

  beforeEach(async () => {
    mockResponse = {
      graphData: [
        {
          midAxisLabel: 'A',
          left: 1,
          right: 2,
          leftBarLabel: 'left A',
          rightBarLabel: 'right A',
        },
        {
          midAxisLabel: 'B',
          left: 3,
          right: 4,
          leftBarLabel: 'left B',
          rightBarLabel: 'right B',
        },
      ],
      kanbanToExpire: [],
      favoriteStickyNotes: [],
    };

    listPomodoroTasksSpy = jest.fn().mockReturnValue(of(mockResponse));

    const mockDashboardService = {
      listPomodoroTasks: listPomodoroTasksSpy,
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHighcharts({
          instance: () => Promise.resolve(Highcharts),
        }),
        { provide: DashboardService, useValue: mockDashboardService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DashboardComponent, {
        set: {
          imports: [
            StubSidenavComponent,
            DashboardKanbanCardComponent,
            StickyNoteComponent,
            HighchartsChartComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data and build chart options', () => {
    expect(listPomodoroTasksSpy).toHaveBeenCalled();

    expect(component.graphData).toEqual(mockResponse.graphData);

    const series = component.chartOptions.series as any[];

    expect(series[0].name).toBe('Concluído');
    expect(series[0].data).toEqual([-1, -3]);

    expect(series[1].name).toBe('Pendente');
    expect(series[1].data).toEqual([2, 4]);
  });
});
