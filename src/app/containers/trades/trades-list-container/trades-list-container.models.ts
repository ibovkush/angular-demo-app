import { TableColumnInfo } from '@c/shared/generic-mat-table/generic-mat-table.models';
import { EditTradeFormModel } from '@c/trades/edit-trade-form/edit-trade-form.model';
import { TradeInfoModel } from '@data/models/trade-info.model';
import moment from 'moment';

export const columns: ReadonlyArray<TableColumnInfo<TradeInfoModel>> = [
  {
    field: 'entryDate',
    title: 'Entry Date',
    // hasSort: true,
    isDefaultSortField: true,
    isCustom: true,
  },
  {
    field: 'entryPrice',
    title: 'Entry Price',
    // hasSort: true,
    isCustom: true,
  },

  {
    field: 'exitDate',
    title: 'Exit Date',
    // hasSort: true,
    isCustom: true,
  },
  {
    field: 'exitPrice',
    title: 'Exit Price',
    // hasSort: true,
    isCustom: true,
  },
  {
    field: 'profit',
    title: 'Profit',
    // hasSort: true,
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
  entryDate: string;
}

export const toFormModelMapper = (model: TradeInfoModel): EditTradeFormModel => ({
  entryPrice: model.entryPrice,
  exitPrice: model.exitPrice,
  entryDate: moment(model.entryDate),
  exitDate: moment(model.exitDate),
});

export const toServiceModelMapper = (model: EditTradeFormModel): TradeInfoModel => ({
  ...model,
  entryDate: model.entryDate.format(),
  exitDate: model.exitDate.format(),
});
