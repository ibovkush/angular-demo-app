import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Route, RouterModule } from '@angular/router';
import { GenericMatTableModule } from '@c/shared/generic-mat-table/generic-mat-table.module';
import { EditTradeFormModule } from '@c/trades/edit-trade-form/edit-trade-form.module';
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
  imports: [CommonModule, RouterModule.forChild(exampleRoutes), GenericMatTableModule, EditTradeFormModule, MatButtonModule],
  providers: [TradeInfoGuard],
})
export class TradesChartContainerModule {}
