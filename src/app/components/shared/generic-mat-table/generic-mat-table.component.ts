import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '@env/environment';
import { BaseSearchResponseViewModel } from '@m/shared/network.models';
import { SearchRequest } from '@m/shared/search.models';
import { GenericMatTableCustomValuesSource } from '@t/generic-mat-table.types';
import { ControlInfo, FormGroupG, getGroup } from '@u/forms/form-generics';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ButtonColumnClickEventModel, TableColumnInfo } from './generic-mat-table.models';

@Component({
  selector: 'demo-generic-mat-table',
  templateUrl: 'generic-mat-table.component.html',
  styleUrls: ['./styles/generic-mat-table.component.scss'],
})
export class GenericMatTableComponent<TModel, TSearchModel> implements OnInit, OnDestroy, AfterViewInit {
  private _destroy$: Subject<void> = new Subject<void>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() search: EventEmitter<SearchRequest<TSearchModel>> = new EventEmitter();
  @Output() buttonClick: EventEmitter<ButtonColumnClickEventModel<TModel>> = new EventEmitter();

  @Input() columns$: Observable<ReadonlyArray<TableColumnInfo<TModel>>>;
  @Input() data$: Observable<BaseSearchResponseViewModel<TModel>>;
  @Input() totalLablel: string;
  @Input() isLoading = false;
  @Input() isSearchEmpty = true;
  @Input() customValues: GenericMatTableCustomValuesSource<TModel>;

  filtredColumns: ReadonlyArray<TableColumnInfo<TModel>>;
  pageSizes: Array<number> = [...environment.pageSizes];
  form: FormGroupG<TSearchModel>;
  defaultSortColumn = '';
  displayedColumns: ReadonlyArray<string> = [];

  private _searchModel: Partial<TSearchModel> = {};
  private;
  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.columns$
      .pipe(
        switchMap((columns) => {
          const controls = {};

          this.displayedColumns = columns.map((column) => column.field);
          this.defaultSortColumn = columns.find((item) => item.isDefaultSortField)?.field || columns[0].field;

          columns.filter((field) => field.hasInlineFilter).forEach((field) => (controls[field.field] = {}));
          this.form = getGroup<TSearchModel>(controls as ControlInfo<TSearchModel>);

          return merge(
            this.sort.sortChange.pipe(
              tap((_) => (this.paginator.pageIndex = 0)),
              takeUntil(this._destroy$)
            ),
            this.paginator.page.pipe(takeUntil(this._destroy$), debounceTime(environment.debounceTimeMS)),

            this.form.valueChanges.pipe(
              takeUntil(this._destroy$),
              debounceTime(environment.debounceTimeMS),
              tap((searchModel) => (this._searchModel = { ...this._searchModel, ...searchModel }))
            )
          );
        })
      )
      .subscribe((value) =>
        this.search.emit({
          searchModel: this._searchModel,
          paging: { pageNumber: this.paginator.pageIndex + 1, pageSize: this.paginator.pageSize },
          sort: { sortField: this.sort.active, sortType: this.sort.direction === 'asc' ? 'Ascending' : 'Descending' },
        })
      );
    this._cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  field(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  ngOnInit(): void {}
}
