import { Component } from '@angular/core';
import { TradeInfoService } from '@data/services/trade-info.service';

@Component({
  selector: 'demo-trades-list-container',
  templateUrl: './trades-list-container.component.html',
  styleUrls: ['./trades-list-container.component.scss'],
})
export class TradesListContainerComponent {
  /**
   * Constructor
   */
  constructor(public tradeInfoService: TradeInfoService) {
    tradeInfoService.entities$.subscribe((result) => {
      console.log(result);
    });
  }
}
