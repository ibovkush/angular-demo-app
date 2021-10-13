import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TradesListContainerComponent } from './trades-list-container.component';

const exampleRoutes: Route[] = [
  {
    path: '',
    component: TradesListContainerComponent,
  },
];

@NgModule({
  declarations: [TradesListContainerComponent],
  imports: [CommonModule, RouterModule.forChild(exampleRoutes)],
})
export class TradesListContainerModule {}
