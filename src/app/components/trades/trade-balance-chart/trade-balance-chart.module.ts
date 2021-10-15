import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { TradeBalanceChartComponent } from './trade-balance-chart.component';

@NgModule({
  imports: [CommonModule, NgApexchartsModule],
  exports: [TradeBalanceChartComponent],
  declarations: [TradeBalanceChartComponent],
  providers: [],
})
export class TradeBalanceChartModule {}
