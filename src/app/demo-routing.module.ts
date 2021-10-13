import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { DemoPreloader } from '@u/demo-preloader';

const routerConfig: ExtraOptions = {
  preloadingStrategy: DemoPreloader,
  relativeLinkResolution: 'legacy',
  scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
  {
    path: 'trades',
    loadChildren: () => import('@cont/trades/trades.module').then((m) => m.TradesModule),
  },
  { path: '', redirectTo: 'trades', pathMatch: 'full' },
  { path: '**', redirectTo: 'trades' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
