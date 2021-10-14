import { Guid } from 'guid-typescript';
import { Moment } from 'moment';

export interface TradeInfoModel {
  readonly id: Guid;
  readonly entryDate: Moment;
  readonly entryPrice: number;
  readonly exitDate: Moment;
  readonly exitPrice: number;
}
