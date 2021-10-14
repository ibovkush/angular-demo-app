import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormDefaultsModule } from '@c/shared/forms/form-defaults.module';
import { fdCurrencyMaskConfig } from '@u/defaults';
import { NgxCurrencyModule } from 'ngx-currency';

import { EditTradeFormComponent } from './edit-trade-form.component';

@NgModule({
  imports: [CommonModule, FormDefaultsModule, MatIconModule, NgxCurrencyModule.forRoot(fdCurrencyMaskConfig)],
  exports: [EditTradeFormComponent],
  declarations: [EditTradeFormComponent],
  providers: [],
})
export class EditTradeFormModule {}
