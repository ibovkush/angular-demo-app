import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TradeBalanceChartModule } from '@c/trades/trade-balance-chart/trade-balance-chart.module';
import { TradeInfoGuard } from '@data/guards/trade-info.guard';

import { TradesChartContainerComponent } from './trades-chart-container.component';

const exampleRoutes: Route[] = [
  {
    path: '',
    component: TradesChartContainerComponent,
    canActivate: [TradeInfoGuard],
  },
];

@NgModule({
  declarations: [TradesChartContainerComponent],
  imports: [CommonModule, RouterModule.forChild(exampleRoutes), TradeBalanceChartModule],
  providers: [TradeInfoGuard],
})
export class TradesChartContainerModule {}
