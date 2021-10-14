import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        pathMatch: 'full',

        loadChildren: () => import('./trades-list-container/trades-list-container.module').then((m) => m.TradesListContainerModule),
      },
      {
        path: 'chart',
        pathMatch: 'full',

        loadChildren: () => import('./trades-chart-container/trades-chart-container.module').then((m) => m.TradesChartContainerModule),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradesRoutingModule {}
