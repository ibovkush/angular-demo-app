import { environment } from '@env/environment';
import { SearchSortType } from '@t/search.types';

export interface SortingModel {
  sortField: string;
  sortType: SearchSortType;
}

export interface PagingModel {
  pageNumber: number | null;
  pageSize: number | null;
}

export interface SearchRequest<TSearchModel> {
  searchModel: Partial<TSearchModel>;
  paging: PagingModel;
  sort: SortingModel;
}

export function getDefaultSearchRequest<TSearchModel>(
  sortType: SearchSortType = 'Ascending',
  sortField: string = ''
): SearchRequest<TSearchModel> {
  return {
    searchModel: {},
    sort: {
      sortField,
      sortType,
    },
    paging: {
      pageNumber: 1,
      pageSize: environment.pageSizes.length ? environment.pageSizes[0] : 10,
    },
  };
}
