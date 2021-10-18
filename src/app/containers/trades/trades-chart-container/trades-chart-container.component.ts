import { Component, OnDestroy, OnInit } from '@angular/core';
import { TradeBalanceChartItemModel, TradeBalanceChartModel } from '@c/trades/trade-balance-chart/trade-balance-chart.models';
import { TradeInfoService } from '@data/services/trade-info.service';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'demo-trades-chart-container',
  templateUrl: './trades-chart-container.component.html',
  styleUrls: ['./trades-chart-container.component.scss'],
})
export class TradesChartContainerComponent implements OnInit, OnDestroy {
  chartModel$: Observable<TradeBalanceChartModel>;
  private readonly _destroyed: Subject<void> = new Subject();

  constructor(public tradeInfoService: TradeInfoService) {
    // TODO: add date range selector
    const startDate = moment().add(-14, 'days').startOf('day');
    const endDate = moment().endOf('day');
    this.chartModel$ = tradeInfoService.entities$.pipe(
      takeUntil(this._destroyed),
      map((values) => {
        const datesData: Array<TradeBalanceChartItemModel> = [];
        const iterationDate = moment(startDate);
        let dateBalance = 0;
        while (iterationDate.isSameOrBefore(endDate, 'date')) {
          values.forEach((item) => {
            if (moment(item.exitDate).isSame(iterationDate, 'date')) {
              dateBalance += item.exitPrice - item.entryPrice;
            }
          });

          datesData.push({
            date: moment(iterationDate),
            value: dateBalance,
          });

          iterationDate.add(1, 'day');
        }

        const result: TradeBalanceChartModel = {
          dateFrom: startDate,
          dateTo: endDate,
          items: datesData,
        };

        return result;
      })
    );
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  ngOnInit(): void {}
}
