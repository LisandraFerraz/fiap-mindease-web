import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Sidenav } from '@components/sidenav/sidenav.component';
import { FormatDateName } from '@functions/get-today-date';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { DashboardService } from './service/dashboard.service';
import { IDashboardRes, IGraphData } from '@models/dashboard-model';
import { IKanbanTodo, StickyNote } from '@models/interfaces-model';
import { DashboardKanbanCardComponent } from '@components/dashboard-kanban-card/dashboard-kanban-card.component';
import { StickyNoteComponent } from '@components/sticky-note/sticky-note.component';

@Component({
  selector: 'app-dashboard',
  imports: [Sidenav, DashboardKanbanCardComponent, StickyNoteComponent, HighchartsChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly cd = inject(ChangeDetectorRef);

  chart: any = [];
  dateToday = FormatDateName(new Date());
  Highcharts: typeof Highcharts = Highcharts;

  graphData: IGraphData[];
  kanbanToExpire: IKanbanTodo[];
  favoriteNotes: StickyNote[];

  chartOptions: Highcharts.Options = {};

  readonly userName = sessionStorage.getItem('usuarioNome') || '';

  ngOnInit() {
    this.listDashboardData();
  }

  private listDashboardData() {
    this.dashboardService.listPomodoroTasks().subscribe({
      next: (res: IDashboardRes) => {
        this.graphData = res.graphData;
        this.kanbanToExpire = res.kanbanToExpire;
        this.favoriteNotes = res.favoriteStickyNotes;

        this.cd.detectChanges();
        this.setChartData();
      },
    });
  }

  private setChartData() {
    const categories = this.graphData.map((g) => g.midAxisLabel);
    const leftSeries = this.graphData.map((g) => -g.left);
    const rightSeries = this.graphData.map((g) => g.right);

    this.chartOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: undefined,
      },
      xAxis: [
        {
          categories: categories,
          reversed: false,
          labels: {
            step: 1,
          },
        },
        {
          opposite: true,
          reversed: false,
          categories: categories,
          linkedTo: 0,
          labels: {
            step: 1,
          },
        },
      ],

      yAxis: {
        title: { text: ' ' },
        showLastLabel: false,
        showFirstLabel: false,
        labels: {
          enabled: false,
        },
      },

      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },

      tooltip: {
        enabled: false,
      },

      series: [
        {
          name: 'Concluído',
          type: 'bar',
          data: leftSeries,
          color: '#6aa96f',
        },
        {
          name: 'Pendente',
          type: 'bar',
          data: rightSeries,
          color: '#dba2a2',
        },
      ],
    };
  }
}
