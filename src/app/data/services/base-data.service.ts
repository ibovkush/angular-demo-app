import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { FilterField } from '@u/filters/universal.filter';
import { ToastrService } from 'ngx-toastr';

export abstract class BaseDataService<TData> extends EntityCollectionServiceBase<TData> {
  constructor(protected toastr: ToastrService, elementsFactory: EntityCollectionServiceElementsFactory, entityName: string) {
    super(entityName, elementsFactory);
  }

  public override setFilter(pattern: Partial<FilterField<TData>>): void {
    super.setFilter(pattern);
  }
}
