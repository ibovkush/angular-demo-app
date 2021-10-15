import { formatCurrency } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonColumnClickEventModel } from '@c/shared/generic-mat-table/generic-mat-table.models';
import { EditTradeFormComponent } from '@c/trades/edit-trade-form/edit-trade-form.component';
import { EditTradeFormModel } from '@c/trades/edit-trade-form/edit-trade-form.model';
import { TradeInfoModel } from '@data/models/trade-info.model';
import { TradeInfoService } from '@data/services/trade-info.service';
import { ToastIconClasses } from '@e/toast-icon-classes';
import { environment } from '@env/environment';
import { BaseSearchResponseViewModel } from '@m/shared/network.models';
import { getDefaultSearchRequest, SearchRequest } from '@m/shared/search.models';
import { GenericMatTableCustomValuesSource } from '@t/generic-mat-table.types';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { merge, of, Subject } from 'rxjs';
import { map, skip, switchMap, takeUntil, tap } from 'rxjs/operators';

import { columns, toFormModelMapper, toServiceModelMapper, TradeInfoTableSearchModel } from './trades-list-container.models';

@Component({
  selector: 'demo-trades-list-container',
  templateUrl: './trades-list-container.component.html',
  styleUrls: ['./trades-list-container.component.scss'],
})
export class TradesListContainerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('demoEditTradeForm') editTradeForm: EditTradeFormComponent;

  resultObj$: Subject<BaseSearchResponseViewModel<TradeInfoModel>> = new Subject();

  tableSearchObj$: Subject<SearchRequest<TradeInfoModel>> = new Subject();
  private _searchObj: SearchRequest<TradeInfoModel>;

  private readonly _destroyed: Subject<void> = new Subject();

  columns$ = of(columns);
  isLoading = false;
  isSearchEmpty = false;

  private defaultSortField = columns.find((col) => col.isDefaultSortField)?.field ?? (columns.length > 0 ? columns[0].field : '');

  editedRecord: TradeInfoModel;

  constructor(
    public tradeInfoService: TradeInfoService,
    private _cdr: ChangeDetectorRef,
    @Inject(LOCALE_ID) private _locale: string,
    private _toastr: ToastrService
  ) {
    this._searchObj = getDefaultSearchRequest<TradeInfoTableSearchModel>('Ascending', this.defaultSortField);
  }

  customValuesSource: GenericMatTableCustomValuesSource<TradeInfoModel> = (field, item) => {
    switch (field) {
      case 'entryDate':
        return of(`${moment(item.entryDate).format(environment.dateFormatMoment)}`);
      case 'exitDate':
        return of(`${moment(item.exitDate).format(environment.dateFormatMoment)}`);
      case 'entryPrice':
        return of(`${formatCurrency(item.entryPrice, this._locale, '$')}`);
      case 'exitPrice':
        return of(`${formatCurrency(item.exitPrice, this._locale, '$')}`);
      case 'profit':
        return of(`${formatCurrency(item.exitPrice - item.entryPrice, this._locale, '$')}`);
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
    this.editTradeForm.clearForm();
    this._cdr.detectChanges();
  }

  buttonClicked(event: ButtonColumnClickEventModel<TradeInfoModel>): void {
    switch (event.fieldName) {
      case 'remove':
        this.removeRecord(event.item);
        break;
      case 'edit':
        this.startToEditRecord(event.item);
        break;
      default:
        break;
    }
  }

  startToEditRecord(model: TradeInfoModel): void {
    // TODO: add confirm if some record already edited;

    this.editedRecord = model;
    const formModel = toFormModelMapper(model);
    this.editTradeForm.value = formModel;
  }

  removeRecord(model: TradeInfoModel): void {
    this.editTradeForm.disableForm();
    // TODO: add confirm;
    this.tradeInfoService.delete(model).subscribe(
      (result) => {
        this._toastr.show(`Trade Info record removed successfully.`, 'Success', {
          toastClass: ToastIconClasses.Success,
        });
        this.editTradeForm.enableFrom();
      },
      (error) => {
        this._toastr.show('Remove operation failed.', 'Error', {
          toastClass: ToastIconClasses.Error,
        });
      }
    );
  }

  submitClicked(model: EditTradeFormModel): void {
    if (model === null) {
      return;
    }

    this.editTradeForm.disableForm();

    const serviceModel = { ...toServiceModelMapper(model), id: this.editedRecord ? this.editedRecord.id : null };

    this.tradeInfoService
      .upsert(serviceModel)
      .pipe(takeUntil(this._destroyed))
      .subscribe(
        (result) => {
          this._toastr.show(`Trade Info record ${this.editedRecord ? 'updated' : 'added'} successfully.`, 'Success', {
            toastClass: ToastIconClasses.Success,
          });
          if (this.editedRecord) {
            this.editedRecord = null;
          }
          this.editTradeForm.enableFrom();
          this.editTradeForm.clearForm();
        },
        (error) => {
          this._toastr.show('Add / update operation failed.', 'Error', {
            toastClass: ToastIconClasses.Error,
          });
        }
      );
  }
}
