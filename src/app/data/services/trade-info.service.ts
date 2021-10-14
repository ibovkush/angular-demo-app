import { Injectable } from '@angular/core';
import { TradeInfoModel } from '@data/models/trade-info.model';
import { BaseDataService } from '@data/services/base-data.service';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class TradeInfoService extends BaseDataService<TradeInfoModel> {
  constructor(toastr: ToastrService, elementsFactory: EntityCollectionServiceElementsFactory) {
    super(toastr, elementsFactory, 'TradeInfo');
  }
}
