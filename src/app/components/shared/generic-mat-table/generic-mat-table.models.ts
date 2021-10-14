export interface ButtonColumnClickEventModel<TModel> {
  fieldName: string;
  index: number;
  item: TModel;
}

export interface TableColumnInfo<T> {
  field: string;
  title: string;
  hasInlineFilter?: boolean;
  searchField?: string;
  hasSort?: boolean;
  isDefaultSortField?: boolean;
  isClickable?: boolean;
  urlMap?: (item: T) => string;
  isHidden?: boolean;
  valueMap?: (item: T) => string;
  exportValueMap?: (item: T) => string;
  headerCssClass?: string;
  cssClass?: string;
  isCustom?: boolean;
  isButtonColumn?: boolean;
  buttonColumnIcon?: string;
}
