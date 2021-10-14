export interface BaseGetResponseModel {
  readonly validationMessage: string;
  readonly responseMessage: string;
  readonly totalRecordsCount: number;
}

export interface BaseUpsertResponse {
  readonly displayMessage: string;
  readonly logMessage: string;
  readonly isSuccess: boolean;
}

export interface OutputIdModel {
  readonly id: number;
}

export interface BaseSearchResponseViewModel<TData> {
  readonly validationMessage: string;
  readonly responseMessage: string;
  readonly totalRecordsCount: number;
  readonly items: ReadonlyArray<TData>;
}
