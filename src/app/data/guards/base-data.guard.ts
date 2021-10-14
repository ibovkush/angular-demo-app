import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { BaseDataService } from '@data/services/base-data.service';
import { Observable, of } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';

export abstract class BaseDataGuard<T> implements CanActivate, CanActivateChild {
  constructor(private _service: BaseDataService<T>) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this._service.loaded$.pipe(
      tap((loaded) => (!loaded ? this._service.getAll() : false)),
      switchMapTo(of(true))
    );
  }
}
