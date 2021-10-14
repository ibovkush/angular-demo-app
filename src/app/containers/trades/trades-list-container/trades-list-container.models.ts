import { TableColumnInfo } from '@c/shared/generic-mat-table/generic-mat-table.models';
import { TradeInfoModel } from '@data/models/trade-info.model';
import { Moment } from 'moment';

export const columns: ReadonlyArray<TableColumnInfo<TradeInfoModel>> = [
  {
    field: 'entryDate',
    title: 'Entry Date',
    hasSort: true,
    isDefaultSortField: true,
    isCustom: true,
  },
  {
    field: 'entryPrice',
    title: 'Entry Price',
    hasSort: true,
    isCustom: true,
  },

  {
    field: 'exitDate',
    title: 'Exit Date',
    hasSort: true,
    isCustom: true,
  },
  {
    field: 'exitPrice',
    title: 'Entry Price',
    hasSort: true,
    isCustom: true,
  },
  {
    field: 'edit',
    title: '',
    isButtonColumn: true,
    buttonColumnIcon: 'edit',
  },
  {
    field: 'remove',
    title: '',
    isButtonColumn: true,
    buttonColumnIcon: 'delete',
  },
];

export interface TradeInfoTableSearchModel {
  entryDate: Moment;
}
