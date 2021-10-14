import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  exports: [MenuComponent],
  declarations: [MenuComponent],
  providers: [],
})
export class MenuModule {}
