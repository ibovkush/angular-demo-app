import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { GenericMatTableModule } from '@c/shared/generic-mat-table/generic-mat-table.module';
import { TradeInfoGuard } from '@data/guards/trade-info.guard';

import { TradesListContainerComponent } from './trades-list-container.component';

const exampleRoutes: Route[] = [
  {
    path: '',
    component: TradesListContainerComponent,
    canActivate: [TradeInfoGuard],
  },
];

@NgModule({
  declarations: [TradesListContainerComponent],
  imports: [CommonModule, RouterModule.forChild(exampleRoutes), GenericMatTableModule],
  providers: [TradeInfoGuard],
})
export class TradesListContainerModule {}
