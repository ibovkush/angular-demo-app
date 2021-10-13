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
    path: 'form',
    // loadChildren: () => import('@cont/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'chart',
    canActivate: [],
    // loadChildren: () => import('@cont/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: '**', redirectTo: 'form' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
