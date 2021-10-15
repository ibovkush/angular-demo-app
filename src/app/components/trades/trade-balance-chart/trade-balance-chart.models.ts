import { Moment } from 'moment';

export interface TradeBalanceChartItemModel {
  readonly date: Moment;
  readonly value: number;
}

export interface TradeBalanceChartModel {
  readonly items: ReadonlyArray<TradeBalanceChartItemModel>;
  readonly dateFrom: Moment;
  readonly dateTo: Moment;
}
