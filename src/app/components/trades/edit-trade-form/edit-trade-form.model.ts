import { Moment } from 'moment';

export interface EditTradeFormModel {
  readonly entryDate: Moment;
  readonly entryPrice: number;
  readonly exitDate: Moment;
  readonly exitPrice: number;
}
