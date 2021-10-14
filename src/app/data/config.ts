import { environment } from '@env/environment';
import { DefaultDataServiceConfig, EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { getDateComparer } from '@u/comparers/date.comparer';
import { universalFilterFunc } from '@u/filters/universal.filter';

import { TradeInfoModel } from './models/trade-info.model';

const entityMetadata: EntityMetadataMap = {
  TradeInfo: {
    sortComparer: getDateComparer<TradeInfoModel>((m) => m.entryDate),
    filterFn: universalFilterFunc,
    selectId: (model: TradeInfoModel) => (model.id ? model.id.toString() : ''),
  },
};

const pluralNames = {
  TradeInfo: 'TradeInfo',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
  timeout: environment.apiTimeoutMs,
};
