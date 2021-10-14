import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TradeInfoModel } from '@data/models/trade-info.model';
import { DefaultDataService, HttpUrlGenerator, Logger } from '@ngrx/data';
import { Guid } from 'guid-typescript';
import moment from 'moment';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradeInfoTransferService extends DefaultDataService<TradeInfoModel> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('TradeInfo', http, httpUrlGenerator);
  }

  override getAll(): Observable<Array<TradeInfoModel>> {
    const startupData: Array<TradeInfoModel> = [
      {
        entryDate: moment().add(-10, 'days').format(),
        entryPrice: 100,
        exitDate: moment().add(-5, 'days').format(),
        exitPrice: 150,
        id: Guid.create(),
      },
      {
        entryDate: moment().add(-9, 'days').format(),
        entryPrice: 90,
        exitDate: moment().add(-5, 'days').format(),
        exitPrice: 120,
        id: Guid.create(),
      },
      {
        entryDate: moment().add(-8, 'days').format(),
        entryPrice: 250,
        exitDate: moment().add(-4, 'days').format(),
        exitPrice: 120,
        id: Guid.create(),
      },
    ];
    return of(startupData);
  }

  override upsert(model: TradeInfoModel): Observable<TradeInfoModel> {
    if (!model.id) {
      model = { ...model, id: Guid.create() };
    }

    return of(model);
  }

  override delete(key: number | string): Observable<number | string> {
    return of(key);
  }
}
