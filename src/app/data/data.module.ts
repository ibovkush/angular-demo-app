import { NgModule } from '@angular/core';
import { DefaultDataServiceConfig, EntityDataModule, EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';

import { defaultDataServiceConfig, entityConfig } from './config';
import { TradeInfoTransferService } from './transfer-services/trade-info.transfer-service';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }],
})
export class DemoDataModule {
  constructor(entityDataService: EntityDataService, tradeInfoTransferService: TradeInfoTransferService) {
    entityDataService.registerService('TradeInfo', tradeInfoTransferService);
  }
}
