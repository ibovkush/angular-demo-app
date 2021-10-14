import { Injectable } from '@angular/core';
import { BaseDataGuard } from '@data/guards/base-data.guard';
import { TradeInfoModel } from '@data/models/trade-info.model';
import { TradeInfoService } from '@data/services/trade-info.service';

@Injectable()
export class TradeInfoGuard extends BaseDataGuard<TradeInfoModel> {
  constructor(service: TradeInfoService) {
    super(service);
  }
}
