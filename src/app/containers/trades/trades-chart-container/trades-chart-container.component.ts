import { Component, OnDestroy, OnInit } from '@angular/core';
import { TradeInfoService } from '@data/services/trade-info.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'demo-trades-chart-container',
  templateUrl: './trades-chart-container.component.html',
  styleUrls: ['./trades-chart-container.component.scss'],
})
export class TradesChartContainerComponent implements OnInit, OnDestroy {
  private readonly _destroyed: Subject<void> = new Subject();

  constructor(public tradeInfoService: TradeInfoService) {
    tradeInfoService.entities$.pipe(takeUntil(this._destroyed)).subscribe((result) => console.table(result));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  ngOnInit(): void {}
}
