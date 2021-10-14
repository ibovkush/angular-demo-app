import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonColumnClickEventModel } from '@c/shared/generic-mat-table/generic-mat-table.models';
import { TradeInfoModel } from '@data/models/trade-info.model';
import { TradeInfoService } from '@data/services/trade-info.service';
import { BaseSearchResponseViewModel } from '@m/shared/network.models';
import { getDefaultSearchRequest, SearchRequest } from '@m/shared/search.models';
import { GenericMatTableCustomValuesSource } from '@t/generic-mat-table.types';
import moment, { Moment } from 'moment';
import { merge, of, Subject } from 'rxjs';
import { map, skip, switchMap, tap } from 'rxjs/operators';

import { columns, TradeInfoTableSearchModel } from './trades-list-container.models';

@Component({
  selector: 'demo-trades-list-container',
  templateUrl: './trades-list-container.component.html',
  styleUrls: ['./trades-list-container.component.scss'],
})
export class TradesListContainerComponent implements OnInit, OnDestroy, AfterViewInit {
  resultObj$: Subject<BaseSearchResponseViewModel<TradeInfoModel>> = new Subject();

  tableSearchObj$: Subject<SearchRequest<TradeInfoModel>> = new Subject();
  private _searchObj: SearchRequest<TradeInfoModel>;

  private readonly _destroyed: Subject<void> = new Subject();

  columns$ = of(columns);
  isLoading = false;
  isSearchEmpty = false;

  private defaultSortField = columns.find((col) => col.isDefaultSortField)?.field ?? (columns.length > 0 ? columns[0].field : '');

  constructor(public tradeInfoService: TradeInfoService, private _cdr: ChangeDetectorRef) {
    this._searchObj = getDefaultSearchRequest<TradeInfoTableSearchModel>('Ascending', this.defaultSortField);
    tradeInfoService.entities$.subscribe((result) => {
      console.log(result);
    });
  }

  customValuesSource: GenericMatTableCustomValuesSource<TradeInfoModel> = (field, item) => {
    switch (field) {
      case 'entryDate':
        return of(`${this.getFormatedDate(item.entryDate)}`);
      case 'exitDate':
        return of(`${this.getFormatedDate(item.exitDate)}`);
      case 'entryPrice':
        return of(`$${item.entryPrice.toFixed(2)}`);
      case 'exitPrice':
        return of(`$${item.exitPrice.toFixed(2)}`);
      default:
        return of('');
    }
  };

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  ngAfterViewInit(): void {
    merge(
      this.columns$.pipe(skip(1)),
      this.tradeInfoService.filteredEntities$,
      this.tableSearchObj$.pipe(
        tap(
          (tableSearchObj) =>
            (this._searchObj = {
              searchModel: {
                ...this._searchObj.searchModel,
                ...tableSearchObj.searchModel,
              },
              paging: tableSearchObj.paging,
              sort: tableSearchObj.sort,
            })
        )
      )
    )
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap(() =>
          this.tradeInfoService.filteredEntities$.pipe(
            map((entities) => {
              const response: BaseSearchResponseViewModel<TradeInfoModel> = {
                items: entities.slice(
                  (this._searchObj.paging.pageNumber - 1) * this._searchObj.paging.pageSize,
                  this._searchObj.paging.pageNumber * this._searchObj.paging.pageSize
                ),
                totalRecordsCount: entities.length,
                responseMessage: '',
                validationMessage: '',
              };
              return response;
            })
          )
        )
      )
      .subscribe((value) => {
        this.isLoading = false;
        this.resultObj$.next(value);
      });
    this._cdr.detectChanges();
  }

  buttonClicked(event: ButtonColumnClickEventModel<TradeInfoModel>): void {
    switch (event.fieldName) {
      case 'remove':
        console.log(`remove ${event.item.id.toString()} clicked`);
        break;
      case 'edit':
        console.log(`edit ${event.item.id.toString()} clicked`);
        break;
      default:
        break;
    }
  }

  private getFormatedDate(model: Moment): string {
    return `${model.month() + 1}/${model.date()}/${model.year()}`;
  }
}
