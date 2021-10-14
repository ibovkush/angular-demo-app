import { Observable } from 'rxjs';

export type GenericMatTableCustomValuesSource<TModel> = (field: string, item: TModel) => Observable<string>;
