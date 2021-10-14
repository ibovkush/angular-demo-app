import { Guid } from 'guid-typescript';

export interface TradeInfoModel {
  readonly id?: Guid;
  readonly entryDate: string;
  readonly entryPrice: number;
  readonly exitDate: string;
  readonly exitPrice: number;
}
