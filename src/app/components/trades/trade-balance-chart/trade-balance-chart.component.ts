import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import { ChartOptions } from '@t/chart.types';
import { ApexAxisChartSeries, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { TradeBalanceChartModel } from './trade-balance-chart.models';

@Component({
  selector: 'demo-trade-balance-chart',
  templateUrl: './trade-balance-chart.component.html',
  styleUrls: ['./trade-balance-chart.component.scss'],
})
export class TradeBalanceChartComponent implements OnInit {
  @Input() data$: Observable<TradeBalanceChartModel>;
  @Input() height = 350;

  @ViewChild('balanceChart') balanceChart: ChartComponent;

  chartSeries$: Observable<ApexAxisChartSeries>;
  chartTitle$: Observable<ApexTitleSubtitle>;
  chartOptions: Partial<ChartOptions>;
  constructor() {}

  ngOnInit(): void {
    const repeatable$ = this.data$.pipe(share());
    this.chartSeries$ = repeatable$.pipe(
      map((data) => [
        {
          name: 'balance',
          data: (data?.items || []).map((item) => ({
            x: item.date.format(environment.dateFormatMoment),
            y: item.value,
          })),
        },
      ])
    );

    this.chartTitle$ = repeatable$.pipe(
      map((data) => ({
        text: `Balance ${data.dateFrom.format(environment.dateFormatMoment)} - ${data.dateTo.format(environment.dateFormatMoment)}`,
        align: 'center',
        style: {
          fontSize: '14px',
        },
      }))
    );

    this.chartOptions = {
      series: [
        {
          name: 'balance',
          data: [],
        },
      ],
      chart: {
        type: 'area',
        height: this.height,
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight',
      },

      title: {
        text: 'Balance',
        align: 'center',
        style: {
          fontSize: '14px',
        },
      },
      xaxis: {
        type: 'datetime',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        tickAmount: 4,
        floating: false,

        labels: {
          style: {
            colors: '#8e8da4',
          },
          offsetY: -7,
          offsetX: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      fill: {
        opacity: 0.5,
      },
      tooltip: {
        x: {
          format: environment.dateFormat,
        },
        fixed: {
          enabled: false,
          position: 'topRight',
        },
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30,
          },
        },
        padding: {
          left: 20,
        },
      },
    };
  }
}
