import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { GenericMatTableComponent } from './generic-mat-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [GenericMatTableComponent],
  declarations: [GenericMatTableComponent],
  providers: [],
})
export class GenericMatTableModule {}
